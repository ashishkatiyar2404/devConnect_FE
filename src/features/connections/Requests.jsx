import axiosClient from "../../api/axiosClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DEFAULT_AVATAR } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "./requestSlice";
import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import LoadingState from "../../components/common/LoadingState";
import EmptyState from "../../components/common/EmptyState";
import ErrorState from "../../components/common/ErrorState";
import { getErrorMessage } from "../../utils/errorUtils";

const Requests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const requestList = useSelector((store) => store.requests);

  const [isLoading, setIsLoading] = useState(!requestList);
  const [fetchError, setFetchError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [activeAction, setActiveAction] = useState(null); // { id: string, status: string } | null
  const [actionError, setActionError] = useState(null); // { id: string, message: string } | null

  useEffect(() => {
    let isCancelled = false;

    const fetchRequests = async () => {
      try {
        const response = await axiosClient.get("/user/request/received");
        if (!isCancelled) {
          dispatch(addRequests(response.data?.data || []));
          setFetchError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          if (err.response?.status === 401) {
            navigate("/login");
            return;
          }
          const message = getErrorMessage(
            err,
            "Failed to load connection requests. Please try again.",
          );
          setFetchError(message);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchRequests();

    return () => {
      isCancelled = true;
    };
  }, [dispatch, navigate, refreshTrigger]);

  const handleRefresh = () => {
    if (isLoading) return;
    setIsLoading(true);
    setFetchError(null);
    setRefreshTrigger((prev) => prev + 1);
  };

  const reviewRequest = async (status, _id) => {
    if (activeAction?.id === _id) return; // Prevent duplicate requests for this item

    setActiveAction({ id: _id, status });
    setActionError(null);

    try {
      await axiosClient.post(`/request/review/${status}/${_id}`);
      dispatch(removeRequest(_id));
    } catch (err) {
      const message = getErrorMessage(
        err,
        `Failed to ${status === "accepted" ? "accept" : "reject"} request. Please try again.`,
      );
      setActionError({ id: _id, message });
    } finally {
      setActiveAction(null);
    }
  };

  if (isLoading && !requestList) {
    return <LoadingState label="Loading requests…" />;
  }

  if (fetchError && !requestList) {
    return (
      <PageContainer>
        <PageHeader
          kicker="Inbox"
          title="Connection requests"
          description="Developers who want to connect with you."
        />
        <ErrorState
          title="Unable to load requests"
          description={fetchError}
          onRetry={handleRefresh}
          retryLabel="Retry"
        />
      </PageContainer>
    );
  }

  if (!requestList || requestList.length === 0) {
    return (
      <PageContainer>
        <PageHeader
          kicker="Inbox"
          title="Connection requests"
          description="Developers who want to connect with you."
        />
        {fetchError && (
          <div className="alert alert-error alert-soft mb-6 text-sm">
            {fetchError}
          </div>
        )}
        <EmptyState
          icon="◻"
          title="Inbox is clear"
          description="You have no pending requests. New signals will land here."
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        kicker="Inbox"
        title="Connection requests"
        description={`${requestList.length} pending review.`}
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

      {fetchError && (
        <div className="alert alert-error alert-soft mb-4 text-sm">
          {fetchError}
        </div>
      )}

      <ul className="space-y-4">
        {requestList.map((request) => {
          const sender = request.fromUserId || {};
          const { firstName, lastName, photoUrl, age, gender, about } = sender;
          const isProcessingThis = activeAction?.id === request._id;
          const isItemError = actionError?.id === request._id;

          return (
            <li
              key={request._id}
              className="flex flex-col gap-4 rounded-2xl border border-base-content/10 bg-base-300 p-4 sm:flex-row sm:items-center sm:p-5"
            >
              <img
                alt={
                  `${firstName || ""} ${lastName || ""}`.trim() ||
                  "Profile photo"
                }
                className="h-16 w-16 shrink-0 rounded-full object-cover ring-1 ring-base-content/10 sm:h-20 sm:w-20"
                src={photoUrl || DEFAULT_AVATAR}
              />
              <div className="min-w-0 flex-1 text-left">
                <h2 className="font-display text-lg font-semibold">
                  {`${firstName || ""} ${lastName || ""}`.trim() || "Developer"}
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

                {isItemError && (
                  <div className="alert alert-error alert-soft mt-2 py-2 text-xs">
                    <span>{actionError.message}</span>
                  </div>
                )}
              </div>
              <div className="flex w-full gap-2 sm:w-auto sm:shrink-0">
                <button
                  type="button"
                  className="btn btn-outline btn-error min-h-10 flex-1 sm:flex-none"
                  onClick={() => reviewRequest("rejected", request._id)}
                  disabled={isProcessingThis}
                >
                  {isProcessingThis && activeAction?.status === "rejected" ? (
                    <>
                      <span className="loading loading-spinner loading-xs" />
                      <span>Rejecting…</span>
                    </>
                  ) : (
                    "Reject"
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-primary min-h-10 flex-1 sm:flex-none"
                  onClick={() => reviewRequest("accepted", request._id)}
                  disabled={isProcessingThis}
                >
                  {isProcessingThis && activeAction?.status === "accepted" ? (
                    <>
                      <span className="loading loading-spinner loading-xs" />
                      <span>Accepting…</span>
                    </>
                  ) : (
                    "Accept"
                  )}
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </PageContainer>
  );
};

export default Requests;
