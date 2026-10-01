import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";

const initalLoginState = {
  emailId: "",
  password: "",
};

const initialSignupState = {
  firstName: "",
  lastName: "",
  age: "",
  emailId: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState(initalLoginState);

  const [signUpData, setSignUpData] = useState(initialSignupState);

  const [error, setError] = useState("");
  const [isLoginForm, setIsLogginForm] = useState(true);

  const handleLoginBtn = async () => {
    setError("");
    try {
      const response = await axios.post(BASE_URL + "/login", loginData, {
        withCredentials: true, // needed for setting the token/cookie for other API calls
      });
      dispatch(addUser(response.data.data));
      navigate("/");
    } catch (e) {
      setError(e?.response?.data?.message);
    }
  };

  const handleSignupBtn = async () => {
    setError("");
    try {
      const response = await axios.post(BASE_URL + "/signup", signUpData, {
        withCredentials: true,
      });
      dispatch(addUser(response.data.data));
      console.log(response);
      if (response.status === 200) {
        navigate("/login");
        setIsLogginForm(true);
      }
    } catch (err) {
      console.log(err);
      console.log(err.response);
      setError(err?.response?.data?.message);
    }
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
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    value={signUpData.firstName}
                    onChange={(e) =>
                      setSignUpData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">last Name</span>
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full max-w-xs"
                    value={signUpData.lastName}
                    onChange={(e) =>
                      setSignUpData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                  />
                </label>
                <label className="form-control w-full max-w-xs my-2">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    type="number"
                    className="input input-bordered w-full max-w-xs"
                    value={signUpData.age}
                    onChange={(e) =>
                      setSignUpData((prev) => ({
                        ...prev,
                        age: e.target.value,
                      }))
                    }
                  />
                </label>
              </>
            )}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={isLoginForm ? loginData.emailId : signUpData.emailId}
                onChange={(e) => {
                  if (isLoginForm) {
                    return setLoginData((prev) => ({
                      ...prev,
                      emailId: e.target.value,
                    }));
                  } else {
                    return setSignUpData((prev) => ({
                      ...prev,
                      emailId: e.target.value,
                    }));
                  }
                }}
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="password"
                className="input input-bordered w-full max-w-xs"
                value={isLoginForm ? loginData.password : signUpData.password}
                onChange={(e) => {
                  if (isLoginForm) {
                    return setLoginData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  } else {
                    return setSignUpData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }
                }}
              />
            </label>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="card-actions justify-center m-2">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLoginBtn : handleSignupBtn}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
        </div>

        <div className="text-center mb-5">
          <p>
            {isLoginForm ? "Do not have account?" : "Already Registered User?"}
            <span
              className="cursor-pointer text-blue-400"
              onClick={() => {
                setLoginData(initalLoginState);
                setSignUpData(initialSignupState);
                setError("");
                setIsLogginForm((prev) => !prev);
              }}
            >
              {!isLoginForm ? " Login here" : " Create account"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
