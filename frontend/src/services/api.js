import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

// ── Axios Instance ────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// ── Request Interceptor — attach JWT ──────────────────────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response Interceptor — auto-refresh on 401 ───────────────────────────
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Queue request until refresh is done
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem('refreshToken');

      if (!refreshToken) {
        // No refresh token — force logout
        localStorage.clear();
        window.location.href = '/auth';
        return Promise.reject(error);
      }

      try {
        const { data } = await axios.post(`${BASE_URL}/api/auth/refresh`, {
          refreshToken,
        });

        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);

        api.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        processQueue(null, data.accessToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.clear();
        window.location.href = '/auth';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ── Auth API ──────────────────────────────────────────────────────────────
export const authAPI = {
  register:   (data) => api.post('/api/auth/register', data),
  login:      (data) => api.post('/api/auth/login', data),
  refresh:    (data) => api.post('/api/auth/refresh', data),
  logout:     (data) => api.post('/api/auth/logout', data),     // revoke single token
  logoutAll:  ()     => api.post('/api/auth/logout-all'),        // revoke all sessions
};

// ── Product API ───────────────────────────────────────────────────────────
export const productAPI = {
  getAll: (params) => api.get('/api/products', { params }),  // { category, minPrice, maxPrice, sort }
  getById: (id)   => api.get(`/api/products/${id}`),
  getCategories:  () => api.get('/api/categories'),
};

// ── Order API ─────────────────────────────────────────────────────────────
export const orderAPI = {
  place:   (data) => api.post('/api/orders', data),
  getMyOrders:    () => api.get('/api/orders/my'),
  getById: (id)   => api.get(`/api/orders/${id}`),
};

// ── Cart API ──────────────────────────────────────────────────────────────
export const cartAPI = {
  getCart:      ()           => api.get('/api/cart'),
  addItem:      (data)       => api.post('/api/cart', data),
  updateQty:    (id, qty)    => api.put(`/api/cart/${id}`, { quantity: qty }),
  removeItem:   (id)         => api.delete(`/api/cart/${id}`),
  clearCart:    ()           => api.delete('/api/cart'),
  mergeCart:    (items)      => api.post('/api/cart/merge', items),
};

// ── Payment API ───────────────────────────────────────────────────────────
export const paymentAPI = {
  createOrder: (data) => api.post('/api/payment/create-order', data),
  verify:      (data) => api.post('/api/payment/verify', data),
};

export default api;
