// ═══════════════════════════════════════════════════════════════════════════
// DermAI – Frontend API Service
// Place this file at: src/services/api.js
//
// All pages import from here:
//   import { auth, users, analyses, routines, products, notifications, learn,
//            getUser, saveUser, setToken, removeToken } from '../services/api';
// ═══════════════════════════════════════════════════════════════════════════

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ─── Local-storage helpers ────────────────────────────────────────────────────
export const setToken   = (t) => localStorage.setItem('dermAI_token', t);
export const getToken   = ()  => localStorage.getItem('dermAI_token');
export const removeToken = () => localStorage.removeItem('dermAI_token');

export const saveUser = (u) =>
  localStorage.setItem('dermAI_user', JSON.stringify(u));
export const getUser  = () => {
  try { return JSON.parse(localStorage.getItem('dermAI_user')); }
  catch { return null; }
};
export const removeUser = () => localStorage.removeItem('dermAI_user');

export const clearSession = () => { removeToken(); removeUser(); };

// ─── Core request helper ──────────────────────────────────────────────────────
async function request(endpoint, options = {}) {
  const token = getToken();

  const isFormData = options.body instanceof FormData;

  const headers = {
    ...(!isFormData && options.body ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: 'include',
    ...options,
    headers,
    body: isFormData
      ? options.body
      : options.body
        ? JSON.stringify(options.body)
        : undefined,
  });

  // Silently refresh access token on 401 (uses httpOnly refresh-token cookie)
  if (res.status === 401 && !options._retry) {
    try {
      const rRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: 'POST',
        credentials: 'include',
      });
      if (rRes.ok) {
        const rData = await rRes.json();
        setToken(rData.accessToken);
        return request(endpoint, { ...options, _retry: true });
      }
    } catch (_) { /* ignore */ }
    clearSession();
    window.dispatchEvent(new Event('auth:logout'));
    const err = new Error('Session expired. Please log in again.');
    err.status = 401;
    throw err;
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err = new Error(data.message || 'Something went wrong.');
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}

// ═══════════════════════════════════════════════════════════════════════════
// AUTH  →  /api/auth/*
// ═══════════════════════════════════════════════════════════════════════════
export const auth = {
  /** POST /api/auth/signup */
  signup: ({ name, email, password }) =>
    request('/auth/signup', { method: 'POST', body: { name, email, password } }),

  /** POST /api/auth/login */
  login: ({ email, password }) =>
    request('/auth/login', { method: 'POST', body: { email, password } }),

  /** POST /api/auth/logout */
  logout: () => request('/auth/logout', { method: 'POST' }),

  /** POST /api/auth/forgot-password */
  forgotPassword: (email) =>
    request('/auth/forgot-password', { method: 'POST', body: { email } }),

  /** POST /api/auth/reset-password */
  resetPassword: (token, password) =>
    request('/auth/reset-password', { method: 'POST', body: { token, password } }),

  /** GET /api/auth/verify-email?token=... */
  verifyEmail: (token) => request(`/auth/verify-email?token=${token}`),

  /** GET /api/auth/me */
  getMe: () => request('/auth/me'),

  /** Redirect browser to Google OAuth */
  googleLogin: () => {
    window.location.href = `${BASE_URL}/auth/google`;
  },
};

// ═══════════════════════════════════════════════════════════════════════════
// USERS  →  /api/users/*
// ═══════════════════════════════════════════════════════════════════════════
export const users = {
  /**
   * PUT /api/users/onboarding
   * Pass a plain object — this function builds the FormData.
   * Optionally include `photo` as a File for the onboarding face photo.
   */
  completeOnboarding: (formData) => {
    const fd = new FormData();
    const { photo, ...rest } = formData;
    Object.entries(rest).forEach(([k, v]) => {
      fd.append(k, Array.isArray(v) ? JSON.stringify(v) : v ?? '');
    });
    if (photo instanceof File) fd.append('photo', photo);
    return request('/users/onboarding', { method: 'PUT', body: fd });
  },

  /**
   * PUT /api/users/profile
   * Pass a plain object; optionally include `photo` as File.
   */
  updateProfile: (formData) => {
    const fd = new FormData();
    const { photo, ...rest } = formData;
    Object.entries(rest).forEach(([k, v]) => {
      if (v !== undefined) fd.append(k, v);
    });
    if (photo instanceof File) fd.append('photo', photo);
    return request('/users/profile', { method: 'PUT', body: fd });
  },

  /** PUT /api/users/skin-profile */
  updateSkinProfile: (data) =>
    request('/users/skin-profile', { method: 'PUT', body: data }),

  /** PUT /api/users/preferences */
  updatePreferences: (data) =>
    request('/users/preferences', { method: 'PUT', body: data }),

  /** PUT /api/users/settings/notifications */
  updateNotificationSettings: (data) =>
    request('/users/settings/notifications', { method: 'PUT', body: data }),

  /** PUT /api/users/settings/privacy */
  updatePrivacySettings: (data) =>
    request('/users/settings/privacy', { method: 'PUT', body: data }),

  /** PUT /api/users/change-password */
  changePassword: (currentPassword, newPassword) =>
    request('/users/change-password', { method: 'PUT', body: { currentPassword, newPassword } }),

  /** GET /api/users/stats */
  getStats: () => request('/users/stats'),

  /** DELETE /api/users/account */
  deleteAccount: (password) =>
    request('/users/account', { method: 'DELETE', body: { password } }),

  /** GET /api/users/data-export */
  exportData: () => request('/users/data-export'),
};

// ═══════════════════════════════════════════════════════════════════════════
// ANALYSES  →  /api/analyses/*
// ═══════════════════════════════════════════════════════════════════════════
export const analyses = {
  /**
   * POST /api/analyses
   * @param {FormData} fd  – must contain `photo` field + optional metadata fields
   */
  create: (fd) => request('/analyses', { method: 'POST', body: fd }),

  /** GET /api/analyses/:id/status */
  getStatus: (id) => request(`/analyses/${id}/status`),

  /** GET /api/analyses/latest */
  getLatest: () => request('/analyses/latest'),

  /** GET /api/analyses/history?page=&limit= */
  getHistory: (page = 1, limit = 10) =>
    request(`/analyses/history?page=${page}&limit=${limit}`),

  /** GET /api/analyses/:id */
  getById: (id) => request(`/analyses/${id}`),

  /**
   * POST /api/analyses/:id/feedback
   * @param {string}  id
   * @param {{ helpful: boolean, accuracy?: number, comment?: string }} payload
   */
  submitFeedback: (id, payload) =>
    request(`/analyses/${id}/feedback`, { method: 'POST', body: payload }),
};

// ═══════════════════════════════════════════════════════════════════════════
// PRODUCTS  →  /api/products/*
// ═══════════════════════════════════════════════════════════════════════════
export const products = {
  /**
   * GET /api/products
   * @param {object} params – { page, limit, category, skinType, search, sortBy, budget, natural, local }
   */
  getAll: (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ''))
    ).toString();
    return request(`/products${qs ? `?${qs}` : ''}`);
  },

  /** GET /api/products/:id */
  getById: (id) => request(`/products/${id}`),

  /** GET /api/products/categories */
  getCategories: () => request('/products/categories'),

  /** GET /api/products/brands */
  getBrands: () => request('/products/brands'),

  /**
   * POST /api/products/:id/save
   * The backend TOGGLES save state — one endpoint handles both save & unsave.
   * Returns { success, saved: bool }
   */
  toggleSave: (id) => request(`/products/${id}/save`, { method: 'POST' }),
  save: (id) => request(`/products/${id}/save`, { method: 'POST' }),
  unsave: (id) => request(`/products/${id}/save`, { method: 'POST' }),

  /** GET /api/products/saved */
  getSaved: () => request('/products/saved'),

  /** GET /api/products/recommended — personalised recommendations from latest analysis */
  getRecommended: () => request('/products/recommended'),
};

// ═══════════════════════════════════════════════════════════════════════════
// ROUTINES  →  /api/routines/*
// ═══════════════════════════════════════════════════════════════════════════
export const routines = {
  /**
   * GET /api/routines/current
   * Returns the active routine + todayLog.
   * Aliased as .get() for backwards compat.
   */
  getCurrent: () => request('/routines/current'),
  get: () => request('/routines/current'),

  /**
   * Routine is auto-generated when an analysis completes.
   * There is NO /generate endpoint — this helper returns a clear error.
   */
  generate: () => Promise.reject(new Error(
    'Routine is automatically created after a skin analysis. Please run a New Analysis first.'
  )),

  /**
   * POST /api/routines/complete
   * Mark a full AM or PM session as done for today.
   * @param {string} period       - 'am' | 'pm'
   * @param {string[]} completedSteps - array of stepIds completed
   * @param {string[]} skippedSteps   - array of stepIds skipped
   */
  completeSession: (period, completedSteps = [], skippedSteps = []) =>
    request('/routines/complete', { method: 'POST', body: { period, completedSteps, skippedSteps } }),

  /**
   * For backwards-compat: legacy completeStep now completes the full session
   * If you only want to mark a single step, add it to the session payload.
   */
  completeStep: (stepId, period) =>
    request('/routines/complete', { method: 'POST', body: { period, completedSteps: [stepId], skippedSteps: [] } }),

  /**
   * POST /api/routines/steps/:stepId/skip
   * Toggles the skip flag on a specific step.
   */
  toggleSkip: (stepId, period) =>
    request(`/routines/steps/${stepId}/skip`, { method: 'POST', body: { period } }),

  /** GET /api/routines/history?page=&limit= */
  getHistory: (page = 1, limit = 30) =>
    request(`/routines/history?page=${page}&limit=${limit}`),

  /** GET /api/routines/streak */
  getStreak: () => request('/routines/streak'),

  /** POST /api/routines/steps – add a product to the routine */
  addProduct: ({ productId, period, stepType, notes }) =>
    request('/routines/steps', { method: 'POST', body: { productId, period, stepType, notes } }),

  /** DELETE /api/routines/steps/:stepId */
  removeStep: (stepId, period) =>
    request(`/routines/steps/${stepId}`, { method: 'DELETE', body: { period } }),
};

// ═══════════════════════════════════════════════════════════════════════════
// LEARN / ARTICLES  →  /api/learn/*
// ═══════════════════════════════════════════════════════════════════════════
export const learn = {
  /**
   * GET /api/learn
   * @param {object} params – { page, limit, category, skinType, search, featured }
   */
  getArticles: (params = {}) => {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ''))
    ).toString();
    return request(`/learn${qs ? `?${qs}` : ''}`);
  },

  /** GET /api/learn/categories */
  getCategories: () => request('/learn/categories'),

  /** GET /api/learn/:slug */
  getBySlug: (slug) => request(`/learn/${slug}`),

  /** POST /api/learn/:slug/like */
  like: (slug) => request(`/learn/${slug}/like`, { method: 'POST' }),
};

// ═══════════════════════════════════════════════════════════════════════════
// NOTIFICATIONS  →  /api/notifications/*
// ═══════════════════════════════════════════════════════════════════════════
export const notifications = {
  /** GET /api/notifications?page=&limit= */
  getAll: (page = 1, limit = 20) =>
    request(`/notifications?page=${page}&limit=${limit}`),

  /** PUT /api/notifications/:id/read */
  markRead: (id) => request(`/notifications/${id}/read`, { method: 'PUT' }),

  /** PUT /api/notifications/read-all */
  markAllRead: () => request('/notifications/read-all', { method: 'PUT' }),

  /** DELETE /api/notifications/:id */
  delete: (id) => request(`/notifications/${id}`, { method: 'DELETE' }),
};

// ═══════════════════════════════════════════════════════════════════════════
// CHAT  →  /api/chat
// ═══════════════════════════════════════════════════════════════════════════
export const chat = {
  /**
   * POST /api/chat
   * messages: [{ role: 'user'|'assistant', content: string }]
   * Returns: { reply: string }
   */
  send: (messages) => request('/chat', { method: 'POST', body: { messages } }),
};

// Also expose as a direct api.post helper used by LearnPage
export const api = {
  post: (path, body) => request(path, { method: 'POST', body }),
};