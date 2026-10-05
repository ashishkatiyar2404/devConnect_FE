import axios from "axios";
import { useEffect } from "react";
import { DEFAULT_AVATAR, BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "./requestSlice";
import PageContainer from "../../components/layout/PageContainer";
import PageHeader from "../../components/layout/PageHeader";
import LoadingState from "../../components/common/LoadingState";
import EmptyState from "../../components/common/EmptyState";

const Requests = () => {
  const dispatch = useDispatch();
  const requestList = useSelector((store) => store.requests);
  console.log(requestList);

  const getConnectionRequest = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/request/received", {
        withCredentials: true,
      });

      console.log(response.data.data);
      dispatch(addRequests(response.data.data));
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const response = await axios.post(
        BASE_URL + `/request/review/${status}/${_id}`,
        {},
        { withCredentials: true },
      );

      dispatch(removeRequest(_id));
      console.log(response);
    } catch (err) {
      console.log(err.response);
      console.log(err.message);
    }
  };

  useEffect(() => {
    getConnectionRequest();
  }, []);

  if (!requestList) {
    return <LoadingState label="Loading requests…" />;
  }

  if (requestList.length === 0) {
    return (
      <PageContainer>
        <PageHeader
          kicker="Inbox"
          title="Connection requests"
          description="Developers who want to connect with you."
        />
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
      />

      <ul className="space-y-4">
        {requestList.map((request) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <li
              key={request._id}
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
              <div className="flex w-full gap-2 sm:w-auto sm:shrink-0">
                <button
                  type="button"
                  className="btn btn-outline btn-error min-h-10 flex-1 sm:flex-none"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  type="button"
                  className="btn btn-primary min-h-10 flex-1 sm:flex-none"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
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
