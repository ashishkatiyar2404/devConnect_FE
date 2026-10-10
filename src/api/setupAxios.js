import axios from "axios";
import { BASE_URL } from "../utils/constants";
import appStore from "../store/appStore";
import { removeUser } from "../features/profile/userSlice";
import { getErrorMessage } from "../utils/errorUtils";

// Flag to prevent redundant multiple redirects on concurrent 401 responses
let isRedirecting = false;

// 1. Configure global axios defaults
axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.timeout = 15000;

// 2. Request Interceptor: Ensure credentials and common config
axios.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 3. Response Interceptor: Centralized error handling and session management
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Attach standardized error message
    error.userMessage = getErrorMessage(error);

    const status = error.response?.status;

    // Handle expired or invalid authentication session (401 Unauthorized)
    if (status === 401) {
      const currentPath =
        typeof window !== "undefined" ? window.location.pathname : "";
      const isAuthPage =
        currentPath === "/login" || currentPath === "/signup";
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

export default axios;

