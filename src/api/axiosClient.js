import axios from "axios";
import { BASE_URL } from "../utils/constants";
import appStore from "../store/appStore";
import { removeUser } from "../features/profile/userSlice";
import { getErrorMessage } from "../utils/errorUtils";

// Flag to prevent redundant multiple redirects on concurrent 401 responses
let isRedirecting = false;

const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Request Interceptor: Ensure credentials and common headers are set
axiosClient.interceptors.request.use(
  (config) => {
    // Ensure withCredentials is true for automatic cookie-based authentication
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Centralized error handling and session management
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Standardize user-facing error message onto error object
    error.userMessage = getErrorMessage(error);

    const status = error.response?.status;

    // Handle expired or invalid authentication session (401 Unauthorized)
    if (status === 401) {
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";
      const isAuthPage = currentPath === "/login" || currentPath === "/signup";
      const requestUrl = error.config?.url || "";
      const isAuthEndpoint =
        requestUrl.includes("/login") || requestUrl.includes("/signup");

      // Don't auto-redirect if user is already on auth page or attempting login/signup
      if (!isAuthPage && !isAuthEndpoint) {
        appStore.dispatch(removeUser());

        if (
          typeof window !== "undefined" &&
          currentPath !== "/login" &&
          !isRedirecting
        ) {
          isRedirecting = true;
          window.location.href = "/login";
          setTimeout(() => {
            isRedirecting = false;
          }, 1500);
        }
      }
    }

    return Promise.reject(error);
  },
);

export { axiosClient };
export default axiosClient;
