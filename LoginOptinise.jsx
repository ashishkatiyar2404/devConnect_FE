/** TEMPORARY TEST COMPONENT */
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

const INITIAL_LOGIN_STATE = {
  emailId: "",
  password: "",
};

const INITIAL_SIGNUP_STATE = {
  firstName: "",
  lastName: "",
  age: "",
  emailId: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isLoginForm, setIsLoginForm] = useState(true);
  const [loginData, setLoginData] = useState(INITIAL_LOGIN_STATE);
  const [signUpData, setSignUpData] = useState(INITIAL_SIGNUP_STATE);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (isLoginForm) {
      setLoginData((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setSignUpData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    setError("");

    const endpoint = isLoginForm ? "/login" : "/signup";
    const formData = isLoginForm ? loginData : signUpData;

    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, formData, {
        withCredentials: true,
      });

      dispatch(addUser(response.data.data));

      if (isLoginForm) {
        navigate("/");
      } else {
        setIsLoginForm(true);
      }
    } catch (error) {
      setError(
        error?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    }
  };

  const resetForm = () => {
    setLoginData(INITIAL_LOGIN_STATE);
    setSignUpData(INITIAL_SIGNUP_STATE);
    setError("");
  };

  const toggleForm = () => {
    resetForm();
    setIsLoginForm((prev) => !prev);
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">
            {isLoginForm ? "Login" : "Create your Account"}
          </h2>

          <div>
            {!isLoginForm && (
              <>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    name="firstName"
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    value={signUpData.firstName}
                    onChange={handleInputChange}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Last Name</span>
                  </div>
                  <input
                    name="lastName"
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    value={signUpData.lastName}
                    onChange={handleInputChange}
                  />
                </label>

                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    name="age"
                    type="number"
                    className="input input-bordered w-full max-w-xs"
                    value={signUpData.age}
                    onChange={handleInputChange}
                  />
                </label>
              </>
            )}

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                name="emailId"
                type="email"
                className="input input-bordered w-full max-w-xs"
                value={isLoginForm ? loginData.emailId : signUpData.emailId}
                onChange={handleInputChange}
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                name="password"
                type="password"
                className="input input-bordered w-full max-w-xs"
                value={isLoginForm ? loginData.password : signUpData.password}
                onChange={handleInputChange}
              />
            </label>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={handleSubmit}>
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>

        <div className="text-center mb-5">
          <p>
            {isLoginForm ? "New user?" : "Already Registered User?"}{" "}
            <span className="cursor-pointer text-blue-400" onClick={toggleForm}>
              {isLoginForm ? "Create an account" : "Login here"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
