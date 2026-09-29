import axios from "axios";
import { useEffect } from "react";
import { DEFAULT_AVATAR, LOCAL_HOST_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requestList = useSelector((store) => store.requests);
  console.log(requestList);

  const getConnectionRequest = async () => {
    try {
      const response = await axios.get(
        LOCAL_HOST_BASE_URL + "/user/request/received",
        { withCredentials: true },
      );

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
        LOCAL_HOST_BASE_URL + `/request/review/${status}/${_id}`,
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

  if (!requestList) return <p>Loading...</p>;

  if (requestList.length === 0)
    return <h1 className="flex justify-center my-10"> No Requests Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connection Requests</h1>

      {requestList.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;

        return (
          <div
            key={_id}
            className="flex justify-between items-center m-4 p-4 rounded-lg bg-base-300 mx-auto max-w-2xl w-full"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full"
                src={photoUrl || DEFAULT_AVATAR}
              />
            </div>
            <div className="text-left mx-4 ">
              <h2 className="font-bold text-xl">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p>{age + ", " + gender}</p>}
              <p>{about}</p>
            </div>
            <div>
              <button
                className="btn btn-primary mx-2"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
              <button
                className="btn btn-secondary mx-2"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
