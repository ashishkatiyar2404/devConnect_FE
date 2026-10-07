import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import EditProfile from "./EditProfile";
import PageContainer from "../../components/layout/PageContainer";
import LoadingState from "../../components/common/LoadingState";
import ErrorState from "../../components/common/ErrorState";
import { BASE_URL } from "../../utils/constants";
import { addUser } from "./userSlice";
import { getErrorMessage } from "../../utils/errorUtils";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const [isLoading, setIsLoading] = useState(!user);
  const [error, setError] = useState(null);
  const [retryTrigger, setRetryTrigger] = useState(0);

  useEffect(() => {
    if (user) {
      return;
    }

    let isCancelled = false;

    const fetchProfile = async () => {
      try {
        const response = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        if (!isCancelled) {
          dispatch(addUser(response.data?.data));
          setError(null);
        }
      } catch (err) {
        if (!isCancelled) {
          if (err.response?.status === 401) {
            navigate("/login");
            return;
          }
          const message = getErrorMessage(
            err,
            "Failed to load profile. Please check your connection.",
          );
          setError(message);
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isCancelled = true;
    };
  }, [user, dispatch, navigate, retryTrigger]);

  const handleRetry = () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    setRetryTrigger((prev) => prev + 1);
  };

  if (isLoading && !user) {
    return <LoadingState label="Loading your profile…" />;
  }

  if (error && !user) {
    return (
      <PageContainer>
        <ErrorState
          title="Unable to load profile"
          description={error}
          onRetry={handleRetry}
          retryLabel="Retry loading profile"
        />
      </PageContainer>
    );
  }

  if (!user) {
    return (
      <PageContainer>
        <ErrorState
          title="Profile not found"
          description="We could not find your profile information. Please log in again."
          onRetry={() => navigate("/login")}
          retryLabel="Go to Login"
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <EditProfile userData={user} />
    </PageContainer>
  );
};

export default Profile;
