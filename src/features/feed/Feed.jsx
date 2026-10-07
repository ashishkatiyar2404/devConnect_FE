import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "./feedSlice";
import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import EmptyState from "../../components/common/EmptyState";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import UserCard from "../../components/common/UserCard";
import { getErrorMessage } from "../../utils/errorUtils";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userFeedData = useSelector((store) => store.feed);

  const [isLoading, setIsLoading] = useState(!userFeedData);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    const fetchFeed = async () => {
      try {
        const feedResponse = await axios.get(BASE_URL + "/user/feed", {
          withCredentials: true,
        });
        if (!isCancelled) {
          dispatch(addFeed(feedResponse.data?.data || []));
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
            "Failed to load developer feed. Please try again.",
          );
          setError(message);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchFeed();

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

  if (isLoading && !userFeedData) {
    return <LoadingState label="Finding developers…" />;
  }

  if (error && !userFeedData) {
    return (
      <PageContainer>
        <ErrorState
          title="Unable to load feed"
          description={error}
          onRetry={handleRefresh}
          retryLabel="Retry feed"
        />
      </PageContainer>
    );
  }

  if (!userFeedData || userFeedData.length === 0) {
    return (
      <PageContainer>
        {error && (
          <div className="alert alert-error alert-soft mb-6 text-sm">
            {error}
          </div>
        )}
        <EmptyState
          icon="✦"
          title="You're all caught up"
          description="No more profiles in your feed right now. Check back soon for new developers to meet."
          action={
            <button
              type="button"
              className="btn btn-outline btn-sm min-h-10"
              onClick={handleRefresh}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-xs" />
                  <span>Refreshing…</span>
                </>
              ) : (
                "Refresh feed"
              )}
            </button>
          }
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        kicker="Discover"
        title="Your feed"
        description="Signal interest in developers you want to work with. They only see you if they signal back."
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
      <UserCard userData={userFeedData[0]} />
    </PageContainer>
  );
};

export default Feed;
