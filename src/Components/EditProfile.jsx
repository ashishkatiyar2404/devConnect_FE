import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

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
    <div className="flex flex-col lg:flex-row justify-center items-start gap-8 my-10 px-4">
      <div className="card bg-base-300 w-full max-w-md shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-xl font-bold">
            Edit Profile
          </h2>

          <div className="space-y-3">
            <label className="form-control w-full">
              <span className="label-text mb-1">First Name</span>
              <input
                name="firstName"
                type="text"
                className="input input-bordered w-full"
                value={profileData.firstName}
                onChange={handleInputChange}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1">Last Name</span>
              <input
                name="lastName"
                type="text"
                className="input input-bordered w-full"
                value={profileData.lastName}
                onChange={handleInputChange}
              />
            </label>

            <div className="flex gap-4">
              <label className="form-control w-1/2">
                <span className="label-text mb-1">Age</span>
                <input
                  name="age"
                  type="number"
                  min="18"
                  className="input input-bordered w-full"
                  value={profileData.age}
                  onChange={handleInputChange}
                />
              </label>

              <label className="form-control w-1/2">
                <span className="label-text mb-1">Gender</span>
                <select
                  name="gender"
                  className="select select-bordered w-full"
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
              <span className="label-text mb-1">Photo URL</span>
              <input
                name="photoUrl"
                type="text"
                className="input input-bordered w-full"
                value={profileData.photoUrl}
                onChange={handleInputChange}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text mb-1">About</span>
              <textarea
                name="about"
                rows="3"
                className="textarea textarea-bordered w-full"
                value={profileData.about}
                onChange={handleInputChange}
              />
            </label>
          </div>

          {error && (
            <p className="text-error text-sm text-center mt-2">{error}</p>
          )}

          <div className="card-actions justify-center mt-4">
            <button
              className="btn btn-primary w-full"
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

      <UserCard userData={profileData} />

      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
