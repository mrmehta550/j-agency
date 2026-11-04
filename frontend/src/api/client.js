/**
 * Centralized API Client for J-Agency Frontend
 *
 * Configures base URL from environment (VITE_API_URL),
 * handles request timeouts, authentication token propagation,
 * and standardizes error/success responses.
 */

export const API_BASE_URL = (() => {
  const envUrl = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL;
  // If explicitly provided and not pointing to localhost, use it
  if (envUrl && !envUrl.includes('127.0.0.1') && !envUrl.includes('localhost')) {
    return envUrl;
  }
  // When running in production browser (Vercel, custom domain, etc.), always target the live Render backend
  if (
    typeof window !== 'undefined' &&
    window.location.hostname &&
    window.location.hostname !== 'localhost' &&
    window.location.hostname !== '127.0.0.1'
  ) {
    return 'https://j-agency-1.onrender.com';
  }
  return envUrl || 'http://127.0.0.1:8000';
})().replace(/\/+$/, '');

const DEFAULT_TIMEOUT_MS = 25000;

/**
 * Universal request wrapper with timeout and token handling
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const timeoutMs = options.timeout || DEFAULT_TIMEOUT_MS;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  // Retrieve optional auth token if present in client storage
  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('token') || localStorage.getItem('access_token')
      : null;

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const config = {
    ...options,
    headers,
    signal: options.signal || controller.signal,
  };

  try {
    const response = await fetch(url, config);
    clearTimeout(timeoutId);

    // Handle 204 No Content
    if (response.status === 204) {
      return { ok: true, status: 204, data: null, error: null };
    }

    let data;
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }
    }

    if (!response.ok) {
      const errorMessage =
        data?.message ||
        data?.error ||
        data?.detail ||
        `Request failed with status ${response.status}`;

      return {
        ok: false,
        status: response.status,
        data,
        error: errorMessage,
      };
    }

    return { ok: true, status: response.status, data, error: null };
  } catch (error) {
    clearTimeout(timeoutId);

    const isTimeout = error.name === 'AbortError';
    const message = isTimeout
      ? 'Request timed out. The server is taking longer than expected to respond.'
      : 'Network error. Please check your internet connection or verify the backend is running.';

    console.error(`API Error on [${options.method || 'GET'} ${endpoint}]:`, error);

    return {
      ok: false,
      status: isTimeout ? 408 : 0,
      data: {
        message,
        error: error.message,
      },
      error: error.message,
    };
  }
}

// ── Categories ────────────────────────────────────────────────
export const getCategories = (options = {}) =>
  request('/api/categories/', options);

// ── Blogs ─────────────────────────────────────────────────────
export const getBlogs = (params = {}, options = {}) => {
  const searchParams = new URLSearchParams();
  if (params.category && params.category !== 'all') searchParams.set('category', params.category);
  if (params.search) searchParams.set('search', params.search);
  if (params.q) searchParams.set('q', params.q);
  if (params.page) searchParams.set('page', params.page);
  if (params.page_size) searchParams.set('page_size', params.page_size);

  const qs = searchParams.toString();
  return request(`/api/blogs/${qs ? `?${qs}` : ''}`, options);
};

export const getBlogDetail = (slug, options = {}) =>
  request(`/api/blogs/${encodeURIComponent(slug)}/`, options);

// ── Case Studies ──────────────────────────────────────────────
export const getCaseStudies = (categoryOrParams = '', options = {}) => {
  const searchParams = new URLSearchParams();
  if (typeof categoryOrParams === 'string' && categoryOrParams && categoryOrParams !== 'all') {
    searchParams.set('category', categoryOrParams);
  } else if (typeof categoryOrParams === 'object' && categoryOrParams !== null) {
    if (categoryOrParams.category && categoryOrParams.category !== 'all') {
      searchParams.set('category', categoryOrParams.category);
    }
    if (categoryOrParams.featured) searchParams.set('featured', categoryOrParams.featured);
    if (categoryOrParams.limit) searchParams.set('limit', categoryOrParams.limit);
  }

  const qs = searchParams.toString();
  return request(`/api/case-studies/${qs ? `?${qs}` : ''}`, options);
};

export const getCaseStudyDetail = (slug, options = {}) =>
  request(`/api/case-studies/${encodeURIComponent(slug)}/`, options);

// ── Contact & Booking Submissions ─────────────────────────────
export const submitContact = (formData, options = {}) =>
  request('/api/contact/', {
    ...options,
    method: 'POST',
    body: JSON.stringify(formData),
  });

export const submitBooking = (formData, options = {}) =>
  request('/api/booking/', {
    ...options,
    method: 'POST',
    body: JSON.stringify(formData),
  });

export const api = {
  getCategories,
  getBlogs,
  getBlogDetail,
  getCaseStudies,
  getCaseStudyDetail,
  submitContact,
  submitBooking,
};

export default api;
