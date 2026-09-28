import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  return (
    user && (
      <div className="flex justify-center items-start gap-8 w-full px-4">
        <EditProfile userData={user} />
      </div>
    )
  );
};

export default Profile;
