import axiosClient from "../../api/axiosClient";
import { useState } from "react";
import { DEFAULT_AVATAR } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../../features/feed/feedSlice";
import { getErrorMessage } from "../../utils/errorUtils";

const UserCard = ({ userData, showActions = true }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoUrl, age, gender, about } = userData;

  const [activeStatus, setActiveStatus] = useState(null);
  const [actionError, setActionError] = useState("");

  const handleRequestClick = async (status, targetId) => {
    if (activeStatus) return; // prevent duplicate requests

    setActiveStatus(status);
    setActionError("");

    try {
      await axiosClient.post(`/request/send/${status}/${targetId}`);
      dispatch(removeUserFromFeed(targetId));
    } catch (err) {
      const message = getErrorMessage(
        err,
        `Failed to send ${status === "interested" ? "interest" : "ignore"}. Please try again.`,
      );
      setActionError(message);
    } finally {
      setActiveStatus(null);
    }
  };

  return (
    <article className="mx-auto w-full max-w-sm overflow-hidden rounded-2xl border border-base-content/10 bg-base-300 shadow-xl">
      <figure className="relative h-72 overflow-hidden sm:h-80">
        <img
          src={photoUrl || DEFAULT_AVATAR}
          alt={`${firstName || ""} ${lastName || ""}`.trim() || "Profile photo"}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-base-300 to-transparent" />
      </figure>
      <div className="space-y-2 px-5 pb-5 pt-2">
        <h2 className="font-display text-xl font-semibold tracking-tight">
          {`${firstName || ""} ${lastName || ""}`.trim()}
        </h2>
        {age && gender && (
          <p className="text-sm capitalize text-base-content/60">
            {age}, {gender}
          </p>
        )}
        {about && (
          <p className="line-clamp-3 text-sm leading-relaxed text-base-content/75">
            {about}
          </p>
        )}

        {actionError && (
          <div className="alert alert-error alert-soft mt-2 py-2 text-xs">
            <span>{actionError}</span>
          </div>
        )}

        {showActions && (
          <div className="flex gap-3 pt-3">
            <button
              type="button"
              className="btn btn-outline min-h-11 flex-1"
              onClick={() => handleRequestClick("ignored", _id)}
              disabled={Boolean(activeStatus)}
            >
              {activeStatus === "ignored" ? (
                <>
                  <span className="loading loading-spinner loading-xs" />
                  <span>Ignoring…</span>
                </>
              ) : (
                "Ignore"
              )}
            </button>
            <button
              type="button"
              className="btn btn-primary min-h-11 flex-1"
              onClick={() => handleRequestClick("interested", _id)}
              disabled={Boolean(activeStatus)}
            >
              {activeStatus === "interested" ? (
                <>
                  <span className="loading loading-spinner loading-xs" />
                  <span>Sending…</span>
                </>
              ) : (
                "Interested"
              )}
            </button>
          </div>
        )}
      </div>
    </article>
  );
};

export default UserCard;
