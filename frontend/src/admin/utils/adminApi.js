import { getApiBase, getServerRoot } from '../../utils/api.js';

// ─── Auth Token Helpers ───────────────────────────────────────────────────────
export const getAuthToken = () => {
  return localStorage.getItem('saffpol_admin_token');
};

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('saffpol_admin_token', token);
  } else {
    localStorage.removeItem('saffpol_admin_token');
  }
};

export const getStoredUser = () => {
  const userStr = localStorage.getItem('saffpol_admin_user');
  try {
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    return null;
  }
};

export const setStoredUser = (user) => {
  if (user) {
    localStorage.setItem('saffpol_admin_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('saffpol_admin_user');
  }
};

// ─── Smart apiFetch (auto local → online fallback) ────────────────────────────
export const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const apiBase = await getApiBase();
  const response = await fetch(`${apiBase}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({ success: false, message: 'Invalid server response' }));

  if (response.status === 401) {
    // Session expired or unauthorized
    setAuthToken(null);
    setStoredUser(null);
    if (!window.location.pathname.startsWith('/admin/login')) {
      window.location.href = '/admin/login';
    }
  }

  return { ok: response.ok, status: response.status, data };
};

// ─── Returns upload endpoint URL (local or online) ───────────────────────────
export const getUploadUrl = async () => {
  const apiBase = await getApiBase();
  return `${apiBase}/upload`;
};

// ─── Resolves a file path to full URL (local or online server root) ───────────
export const resolveFileUrl = async (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const root = await getServerRoot();
  return `${root}${path}`;
};

// ─── Auth Actions ─────────────────────────────────────────────────────────────
export const adminLogin = async (email, password) => {
  const result = await apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });

  if (result.ok && result.data.success) {
    setAuthToken(result.data.token);
    setStoredUser(result.data.user);
  }
  return result;
};

export const adminLogout = () => {
  setAuthToken(null);
  setStoredUser(null);
  window.location.href = '/admin/login';
};
