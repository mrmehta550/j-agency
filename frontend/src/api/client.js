export const API_BASE_URL = (import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/+$/, '');

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (!response.ok) {
      return { ok: false, status: response.status, data, error: data?.error || data?.message };
    }
    return { ok: true, status: response.status, data };
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    return {
      ok: false,
      status: 0,
      data: {
        message: 'Network error. Please make sure the backend server is running.',
        error: error.message,
      },
      error: error.message,
    };
  }
}

export const getCategories = () => request('/api/categories/');

export const getBlogs = (params = {}) => {
  const searchParams = new URLSearchParams();
  if (params.category && params.category !== 'all') searchParams.set('category', params.category);
  if (params.search) searchParams.set('search', params.search);
  if (params.q) searchParams.set('q', params.q);
  if (params.page) searchParams.set('page', params.page);
  if (params.page_size) searchParams.set('page_size', params.page_size);
  const qs = searchParams.toString();
  return request(`/api/blogs/${qs ? `?${qs}` : ''}`);
};

export const getBlogDetail = (slug) => request(`/api/blogs/${encodeURIComponent(slug)}/`);

export const getCaseStudies = (categoryOrParams = '') => {
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
  return request(`/api/case-studies/${qs ? `?${qs}` : ''}`);
};

export const getCaseStudyDetail = (slug) => request(`/api/case-studies/${encodeURIComponent(slug)}/`);

export const submitContact = (formData) =>
  request('/api/contact/', {
    method: 'POST',
    body: JSON.stringify(formData),
  });

export const submitBooking = (formData) =>
  request('/api/booking/', {
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
