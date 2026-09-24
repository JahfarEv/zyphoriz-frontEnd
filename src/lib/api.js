const getApiBaseUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  if (import.meta.env.DEV) return 'http://localhost:5002/api/v1';
  return 'https://api.zyphoriz.com/api/v1';
};

const API_URL = getApiBaseUrl();
const TOKEN_KEY = 'zyphoriz_token';

const request = async (path, options = {}) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = {
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers,
      credentials: 'include',
      signal: controller.signal,
    });

    const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) {
  console.error('API request failed:', {
    endpoint: `${API_URL}${path}`,
    status: response.status,
    response: payload,
  });

  const message =
    payload.message ||
    payload.error?.message ||
    payload.error ||
    `Request failed with status code ${response.status}`;

  throw new Error(
    typeof message === 'string'
      ? message
      : JSON.stringify(message)
  );
}

    return payload.token ? { ...payload.data, token: payload.token } : payload.data;
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('Request timed out while contacting the server. Please check that the backend is running.');
    }

    if (error instanceof TypeError) {
      throw new Error('Network error: the backend is unreachable or CORS is blocking the request.');
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

export const authToken = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export const api = {
  auth: {
    register: (body) => request('/auth/register', { method: 'POST', body: JSON.stringify(body) }),
    login: (body) => request('/auth/login', { method: 'POST', body: JSON.stringify(body) }),
    me: () => request('/auth/me'),
    logout: () => request('/auth/logout', { method: 'POST' }),
  },
  businesses: {
    list: (params = '') => request(`/businesses${params ? `?${params}` : ''}`),
    bySlug: (slug) => request(`/businesses/slug/${encodeURIComponent(slug)}`),
    getBySlug: (slug) => request(`/businesses/slug/${encodeURIComponent(slug)}`),
    mine: () => request('/businesses/mine'),
    create: (body) => request('/businesses', { method: 'POST', body }),
    update: (id, body) => request(`/businesses/${id}`, { method: 'PUT', body }),
    remove: (id) => request(`/businesses/${id}`, { method: 'DELETE' }),
  },
  categories: { list: (params = '') => request(`/categories${params}`) },
  payments: {
    createOrder: (body) => request('/payments/order', { method: 'POST', body: JSON.stringify(body) }),
    checkout: (body) => request('/payments/checkout', { method: 'POST', body: JSON.stringify(body) }),
    mine: () => request('/payments/mine'),
  },
  referrals: () => request('/users/referrals'),
};

