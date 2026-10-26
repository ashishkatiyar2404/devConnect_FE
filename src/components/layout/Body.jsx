import { useEffect, useState } from "react";
import { Outlet } from "react-router";
import axios from "axios";
import "../../api/socket";
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../features/profile/userSlice";
import Footer from "./Footer";
import { getErrorMessage } from "../../utils/errorUtils";

const Body = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  const [isAuthChecking, setIsAuthChecking] = useState(!user);
  const [sessionError, setSessionError] = useState(null);
  const [retryTrigger, setRetryTrigger] = useState(0);

  useEffect(() => {
    if (user) {
      return;
    }

    let isCancelled = false;

    const fetchSession = async () => {
      try {
        const response = await axios.get("/profile/view");
        if (!isCancelled) {
          dispatch(addUser(response.data?.data));
          setSessionError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          // If status is not 401, server/network issue occurred
          if (err.response?.status !== 401) {
            const message = getErrorMessage(
              err,
              "Failed to verify session. Please check your connection.",
            );
            setSessionError(message);
          }
        }
      } finally {
        if (!isCancelled) {
          setIsAuthChecking(false);
        }
      }
    };

    fetchSession();

    return () => {
      isCancelled = true;
    };
  }, [user, dispatch, retryTrigger]);

  const handleRetry = () => {
    setSessionError(null);
    setIsAuthChecking(true);
    setRetryTrigger((prev) => prev + 1);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-base-100">
      <NavBar isAuthChecking={isAuthChecking} />
      {sessionError && !user && (
        <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
          <div className="alert alert-error alert-soft flex items-center justify-between text-sm">
            <span>{sessionError}</span>
            <button
              type="button"
              className="btn btn-ghost btn-xs underline"
              onClick={handleRetry}
            >
              Retry
            </button>
          </div>
        </div>
      )}
      <main className="relative flex-1">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,oklch(78%_0.12_175_/_0.08),transparent_60%)]" />
        <div className="relative">
          <Outlet context={{ isAuthChecking, sessionError, handleRetry }} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Body;
