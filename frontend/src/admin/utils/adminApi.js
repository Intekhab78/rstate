const API_BASE_URL = 'http://localhost:5000/api';

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

export const apiFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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
