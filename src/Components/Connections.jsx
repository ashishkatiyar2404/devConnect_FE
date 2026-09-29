import axios from "axios";
import { useEffect } from "react";
import { DEFAULT_AVATAR, LOCAL_HOST_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connectionList = useSelector((store) => store.connections);

  const getAllConnections = async () => {
    try {
      const response = await axios.get(
        LOCAL_HOST_BASE_URL + "/user/connections",
        {
          withCredentials: true,
        },
      );
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

  if (!connectionList) return <p>Loading.....</p>;

  if (!connectionList || connectionList.length === 0) {
    return (
      <div className="text-center my-16 px-4">
        <h2 className="text-2xl font-semibold text-gray-300">
          No Connections Found
        </h2>
        <p className="text-gray-500 mt-2">
          Explore and connect with other users to see them here.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center my-10">
      <h1 className="text-bold text-white text-3xl">Connections</h1>

      {connectionList.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;

        return (
          <div
            key={_id}
            className="flex m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto"
          >
            <div>
              <img
                alt="photo"
                className="w-20 h-20 rounded-full object-cover"
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
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
