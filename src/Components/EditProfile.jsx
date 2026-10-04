import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import PageHeader from "./PageHeader";

const EditProfile = ({ userData }) => {
  const dispatch = useDispatch();

  const [profileData, setProfileData] = useState({
    firstName: userData?.firstName || "",
    lastName: userData?.lastName || "",
    age: userData?.age || "",
    gender: userData?.gender || "",
    about: userData?.about || "",
    photoUrl: userData?.photoUrl || "",
  });

  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      setError("");
      setToast(false);
      setIsLoading(true);

      const profileChangesResponse = await axios.patch(
        `${BASE_URL}/profile/edit`,
        profileData,
        { withCredentials: true },
      );

      dispatch(addUser(profileChangesResponse.data.data));
      setToast(true);

      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Failed to update profile. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        kicker="You"
        title="Edit profile"
        description="This is how other developers will see you in the feed."
      />

      <div className="flex flex-col items-stretch justify-center gap-8 lg:flex-row lg:items-start">
        <div className="card w-full max-w-md border border-base-content/10 bg-base-300 shadow-xl">
          <div className="card-body">
            <h2 className="font-display text-lg font-semibold">Details</h2>

            <div className="space-y-3">
              <label className="form-control w-full">
                <span className="label-text mb-1 text-base-content/70">
                  First name
                </span>
                <input
                  name="firstName"
                  type="text"
                  className="input input-bordered w-full bg-base-200"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text mb-1 text-base-content/70">
                  Last name
                </span>
                <input
                  name="lastName"
                  type="text"
                  className="input input-bordered w-full bg-base-200"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                />
              </label>

              <div className="flex flex-col gap-3 sm:flex-row">
                <label className="form-control w-full sm:w-1/2">
                  <span className="label-text mb-1 text-base-content/70">
                    Age
                  </span>
                  <input
                    name="age"
                    type="number"
                    min="18"
                    className="input input-bordered w-full bg-base-200"
                    value={profileData.age}
                    onChange={handleInputChange}
                  />
                </label>

                <label className="form-control w-full sm:w-1/2">
                  <span className="label-text mb-1 text-base-content/70">
                    Gender
                  </span>
                  <select
                    name="gender"
                    className="select select-bordered w-full bg-base-200"
                    value={profileData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="others">Other</option>
                  </select>
                </label>
              </div>

              <label className="form-control w-full">
                <span className="label-text mb-1 text-base-content/70">
                  Photo URL
                </span>
                <input
                  name="photoUrl"
                  type="text"
                  className="input input-bordered w-full bg-base-200"
                  value={profileData.photoUrl}
                  onChange={handleInputChange}
                />
              </label>

              <label className="form-control w-full">
                <span className="label-text mb-1 text-base-content/70">
                  About
                </span>
                <textarea
                  name="about"
                  rows="3"
                  className="textarea textarea-bordered w-full bg-base-200"
                  value={profileData.about}
                  onChange={handleInputChange}
                />
              </label>
            </div>

            {error && (
              <div className="alert alert-error alert-soft mt-2 text-sm">
                {error}
              </div>
            )}

            <div className="card-actions mt-4">
              <button
                className="btn btn-primary min-h-11 w-full"
                onClick={handleSaveChanges}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24">
          <p className="mb-3 text-center text-xs font-semibold uppercase tracking-[0.18em] text-base-content/40">
            Preview
          </p>
          <UserCard userData={profileData} showActions={false} />
        </div>
      </div>

      {toast && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-success">
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
