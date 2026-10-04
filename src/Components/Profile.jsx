import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";
import PageContainer from "./PageContainer";
import LoadingState from "./LoadingState";

const Profile = () => {
  const user = useSelector((store) => store.user);

  if (!user) {
    return <LoadingState label="Loading your profile…" />;
  }

  return (
    <PageContainer>
      <EditProfile userData={user} />
    </PageContainer>
  );
};

export default Profile;
