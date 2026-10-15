import axios from "axios";

const BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: BASE_URL,
});

// Attach the current access token to each API request.
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("Ig_at");

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// Share one refresh request when multiple requests fail together.
let refreshPromise = null;

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    const url = originalRequest?.url ?? "";

    // Do not refresh failed login or refresh requests.
    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      url.includes("/Auth/login") ||
      url.includes("/Auth/refresh")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = localStorage.getItem("Ig_rt");

    if (!refreshToken) {
      localStorage.removeItem("Ig_at");
      localStorage.removeItem("Ig_rt");

      return Promise.reject(error);
    }

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .post(`${BASE_URL}/Auth/refresh`, {
            refreshToken,
          })
          .then(({ data }) => {
            localStorage.setItem("Ig_at", data.accessToken);

            localStorage.setItem("Ig_rt", data.refreshToken);

            return data;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const tokens = await refreshPromise;

      // Retry the original request using the new access token.
      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem("Ig_at");
      localStorage.removeItem("Ig_rt");
      localStorage.removeItem("ui");

      return Promise.reject(refreshError);
    }
  },
);

export default api;
