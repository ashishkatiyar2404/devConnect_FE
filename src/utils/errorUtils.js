/**
 * Extracts a user-friendly error message from an API or runtime error.
 *
 * @param {unknown} error - The caught error object
 * @param {string} [defaultMessage="Something went wrong. Please try again."] - Fallback message
 * @returns {string} Human-readable error message
 */
export const getErrorMessage = (
  error,
  defaultMessage = "Something went wrong. Please try again.",
) => {
  if (!error) return defaultMessage;

  // Axios network error or aborted request
  if (error.code === "ERR_NETWORK" || error.message === "Network Error") {
    return "Unable to connect to the server. Please check your internet connection and try again.";
  }

  if (
    error.code === "ECONNABORTED" ||
    error.message?.toLowerCase?.().includes("timeout")
  ) {
    return "Request timed out. Please try again.";
  }

  // Backend response error data
  const responseData = error.response?.data;
  if (responseData) {
    if (typeof responseData === "string" && responseData.trim()) {
      return responseData;
    }
    if (responseData.message && typeof responseData.message === "string") {
      return responseData.message;
    }
    if (responseData.error && typeof responseData.error === "string") {
      return responseData.error;
    }
  }

  // HTTP status fallbacks if no response body message
  const status = error.response?.status;
  if (status === 400) {
    return "Invalid request. Please check your information and try again.";
  }
  if (status === 401) {
    return "Session expired or unauthorized. Please log in again.";
  }
  if (status === 403) {
    return "You do not have permission to perform this action.";
  }
  if (status === 404) {
    return "The requested resource could not be found.";
  }
  if (status >= 500) {
    return "Server error. Our team has been notified. Please try again shortly.";
  }

  // Generic Error object message
  if (
    error.message &&
    typeof error.message === "string" &&
    error.message !== "Error"
  ) {
    return error.message;
  }

  return defaultMessage;
};
