const API_URL = import.meta.env.VITE_API_URL || 'https://api.zyphoriz.com/api/v1';
const TOKEN_KEY = 'zyphoriz_token';

const request = async (path, options = {}) => {
  const token = localStorage.getItem(TOKEN_KEY);
  const headers = {
    ...(options.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.success === false) {
    throw new Error(payload.message || 'Something went wrong. Please try again.');
  }
  return payload.token ? { ...payload.data, token: payload.token } : payload.data;
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

