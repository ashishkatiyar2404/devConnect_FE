import axios from "axios";
import { useEffect } from "react";
import { LOCAL_HOST_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeedData = useSelector((store) => store.feed);

  useEffect(() => {
    const getFeed = async () => {
      try {
        const feedResponse = await axios.get(
          LOCAL_HOST_BASE_URL + "/user/feed",
          {
            withCredentials: true,
          },
        );
        dispatch(addFeed(feedResponse.data.data));
      } catch (error) {
        console.log(error.message);
      }
    };

    getFeed();
  }, []);

  if (!userFeedData) return;
  if (userFeedData.length === 0) return <h1>No Feed</h1>;

  return (
    userFeedData && (
      <div>
        <UserCard userData={userFeedData[0]} />
      </div>
    )
  );
};

export default Feed;
