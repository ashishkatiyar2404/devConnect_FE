import axiosClient from "../../api/axiosClient";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { DEFAULT_AVATAR } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "./connectionSlice";
import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import LoadingState from "../../components/common/LoadingState";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import { getErrorMessage } from "../../utils/errorUtils";

const Connections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const connectionList = useSelector((store) => store.connections);

  const [isLoading, setIsLoading] = useState(!connectionList);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    const fetchConnections = async () => {
      try {
        const response = await axiosClient.get("/user/connections");
        if (!isCancelled) {
          dispatch(addConnections(response.data?.data || []));
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          if (err.response?.status === 401) {
            navigate("/login");
            return;
          }
          const message = getErrorMessage(
            err,
            "Failed to load connections. Please try again.",
          );
          setError(message);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchConnections();

    return () => {
      isCancelled = true;
    };
  }, [dispatch, navigate, refreshTrigger]);

  const handleRefresh = () => {
    if (isLoading) return; // Prevent duplicate requests
    setIsLoading(true);
    setError(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  if (isLoading && !connectionList) {
    return <LoadingState label="Loading connections…" />;
  }

  if (error && !connectionList) {
    return (
      <PageContainer>
        <PageHeader
          kicker="Network"
          title="Connections"
          description="People you've both signalled interest in."
        />
        <ErrorState
          title="Unable to load connections"
          description={error}
          onRetry={handleRefresh}
          retryLabel="Retry"
        />
      </PageContainer>
    );
  }

  if (!connectionList || connectionList.length === 0) {
    return (
      <PageContainer>
        <PageHeader
          kicker="Network"
          title="Connections"
          description="People you've both signalled interest in."
        />
        {error && (
          <div className="alert alert-error alert-soft mb-6 text-sm">
            {error}
          </div>
        )}
        <EmptyState
          icon="◎"
          title="No connections yet"
          description="Explore the feed and mark developers as interested. When they do the same, they show up here."
          action={
            <Link to="/" className="btn btn-primary btn-sm min-h-10">
              Discover developers
            </Link>
          }
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        kicker="Network"
        title="Connections"
        description={`${connectionList.length} developer${
          connectionList.length === 1 ? "" : "s"
        } in your circle.`}
        actions={
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-xs" />
            ) : (
              "Refresh"
            )}
          </button>
        }
      />

      {error && (
        <div className="alert alert-error alert-soft mb-4 text-sm">{error}</div>
      )}

      <ul className="space-y-4">
        {connectionList.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

          return (
            <li
              key={_id}
              className="flex flex-col gap-4 rounded-2xl border border-base-content/10 bg-base-300 p-4 sm:flex-row sm:items-center sm:p-5"
            >
              <img
                alt={`${firstName} ${lastName}`}
                className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-base-content/10 sm:h-20 sm:w-20"
                src={photoUrl || DEFAULT_AVATAR}
              />
              <div className="min-w-0 flex-1 text-left">
                <h2 className="font-display text-lg font-semibold">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-sm capitalize text-base-content/60">
                    {age}, {gender}
                  </p>
                )}
                {about && (
                  <p className="mt-1 line-clamp-2 text-sm text-base-content/70">
                    {about}
                  </p>
                )}
              </div>
              <Link to={`/chat/${_id}`} className="shrink-0 sm:self-center">
                <button
                  type="button"
                  className="btn btn-primary btn-sm min-h-10 w-full sm:w-auto"
                >
                  Chat
                </button>
              </Link>
            </li>
          );
        })}
      </ul>
    </PageContainer>
  );
};

export default Connections;
