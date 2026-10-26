import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useOutletContext } from "react-router";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import PageContainer from "../components/layout/PageContainer";

/**
 * Route guard for authenticated views.
 * - Shows loading state during initial session verification.
 * - Shows retryable error state if network/server fails during verification.
 * - Redirects unauthenticated users to /login preserving the requested location.
 * - Renders child route if authenticated.
 */
const ProtectedRoute = () => {
  const user = useSelector((store) => store.user);
  const location = useLocation();
  const { isAuthChecking, sessionError, handleRetry } =
    useOutletContext() || {};

  // 1. Session verification in progress on initial page load / refresh
  if (isAuthChecking) {
    return <LoadingState label="Verifying session…" />;
  }

  // 2. Network or server error prevented session check
  if (sessionError && !user) {
    return (
      <PageContainer>
        <ErrorState
          title="Unable to verify session"
          description={sessionError}
          onRetry={handleRetry}
          retryLabel="Retry"
        />
      </PageContainer>
    );
  }

  // 3. User is not authenticated -> redirect to login with original target in state
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 4. User is authenticated -> render protected route
  return <Outlet />;
};

export default ProtectedRoute;
