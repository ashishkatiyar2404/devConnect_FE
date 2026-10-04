import axios from "axios";
import { useEffect } from "react";
import { Link } from "react-router";
import { DEFAULT_AVATAR, BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import PageContainer from "./PageContainer";
import PageHeader from "./PageHeader";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionList = useSelector((store) => store.connections);

  const getAllConnections = async () => {
    try {
      const response = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(response.data.data));
    } catch (err) {
      // Handle Error Case
      console.log(err.response);
      console.log(err.message);
    }
  };

  useEffect(() => {
    getAllConnections();
  }, []);

  if (!connectionList) {
    return <LoadingState label="Loading connections…" />;
  }

  if (connectionList.length === 0) {
    return (
      <PageContainer>
        <PageHeader
          kicker="Network"
          title="Connections"
          description="People you've both signalled interest in."
        />
        <EmptyState
          icon="◎"
          title="No connections yet"
          description="Explore the feed and mark developers as interested. When they do the same, they show up here."
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
      />

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
              <Link
                to={`/chat/${_id}`}
                className="shrink-0 sm:self-center"
              >
                <button type="button" className="btn btn-primary btn-sm min-h-10 w-full sm:w-auto">
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
