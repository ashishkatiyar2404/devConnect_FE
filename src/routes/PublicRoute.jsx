import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useOutletContext } from "react-router";
import LoadingState from "../components/common/LoadingState";

/**
 * Route guard for guest/public-only views (e.g. /login, /signup).
 * - Shows loading state during initial session verification.
 * - Redirects already-authenticated users to home or previous location.
 * - Renders public child route if unauthenticated.
 */
const PublicRoute = () => {
  const user = useSelector((store) => store.user);
  const location = useLocation();
  const { isAuthChecking } = useOutletContext() || {};

  // 1. Session verification in progress on initial page load / refresh
  if (isAuthChecking) {
    return <LoadingState label="Verifying session…" />;
  }

  // 2. User is already authenticated -> redirect to requested target or home
  if (user) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  // 3. User is unauthenticated -> render public route
  return <Outlet />;
};

export default PublicRoute;
