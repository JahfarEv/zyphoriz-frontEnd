const getApiBaseUrl = () => {
  const configuredUrl = import.meta.env.VITE_API_URL?.trim();
  const isLoopbackUrl = configuredUrl && /\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(configuredUrl);

  if (configuredUrl && !(import.meta.env.PROD && isLoopbackUrl)) {
    return configuredUrl;
  }

  if (import.meta.env.DEV) return 'http://localhost:5002/api/v1';
  return 'https://api.zyphoriz.com/api/v1';
};

const API_URL = getApiBaseUrl();
const TOKEN_KEY = 'zyphoriz_token';
const DEFAULT_REQUEST_TIMEOUT_MS = 20000;
const BUSINESS_UPLOAD_TIMEOUT_MS = 120000;
const PAYMENT_REQUEST_TIMEOUT_MS = 60000;

const request = async (path, options = {}) => {
  const { timeoutMs = DEFAULT_REQUEST_TIMEOUT_MS, ...fetchOptions } = options;
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = {
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...fetchOptions,
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
      throw new Error(`Request timed out after ${Math.round(timeoutMs / 1000)} seconds. Please try again.`);
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
    checkSlug: (slug) => request(`/businesses/slug-availability?slug=${encodeURIComponent(slug)}`),
    bySlug: (slug) => request(`/businesses/slug/${encodeURIComponent(slug)}`),
    getBySlug: (slug) => request(`/businesses/slug/${encodeURIComponent(slug)}`),
    mine: () => request('/businesses/mine'),
    create: (body) => request('/businesses', {
      method: 'POST',
      body,
      timeoutMs: BUSINESS_UPLOAD_TIMEOUT_MS,
    }),
    update: (id, body) => request(`/businesses/${id}`, {
      method: 'PUT',
      body,
      timeoutMs: BUSINESS_UPLOAD_TIMEOUT_MS,
    }),
    remove: (id) => request(`/businesses/${id}`, { method: 'DELETE' }),
  },
  categories: { list: (params = '?limit=200') => request(`/categories${params}`) },
  payments: {
    price: () => request('/payments/price'),
    createOrder: (body) => request('/payments/order', {
      method: 'POST',
      body: JSON.stringify(body),
      timeoutMs: PAYMENT_REQUEST_TIMEOUT_MS,
    }),
    checkout: (body) => request('/payments/checkout', {
      method: 'POST',
      body: JSON.stringify(body),
      timeoutMs: PAYMENT_REQUEST_TIMEOUT_MS,
    }),
    mine: () => request('/payments/mine'),
  },
  referrals: {
    get: () => request('/users/referrals'),
    redeem: (body) =>
      request('/users/referrals/redeem', {
        method: 'POST',
        body: JSON.stringify(body),
      }),
  },
};
