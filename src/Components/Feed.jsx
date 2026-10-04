import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import PageContainer from "./PageContainer";
import PageHeader from "./PageHeader";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";

const Feed = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userFeedData = useSelector((store) => store.feed);

  useEffect(() => {
    const getFeed = async () => {
      try {
        const feedResponse = await axios.get(BASE_URL + "/user/feed", {
          withCredentials: true,
        });
        dispatch(addFeed(feedResponse.data.data));
      } catch (error) {
        // TODO : remove this and implement protected route
        navigate("/login");
        console.log(error.message);
      }
    };

    getFeed();
  }, []);

  if (!userFeedData) {
    return <LoadingState label="Finding developers…" />;
  }

  if (userFeedData.length === 0) {
    return (
      <PageContainer>
        <EmptyState
          icon="✦"
          title="You're all caught up"
          description="No more profiles in your feed right now. Check back soon for new developers to meet."
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
      />
      <UserCard userData={userFeedData[0]} />
    </PageContainer>
  );
};

export default Feed;
