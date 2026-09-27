import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [loginData, setLoginData] = useState({
    emailId: "",
    password: "",
  });

  const handleLoginBtn = async () => {
    const response = await axios.post(
      "http://localhost:8000/login",
      loginData,
      {
        withCredentials: true, // needed for setting the token/cookie for other API calls
      },
    );
    console.log(response, "response");
  };
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-300 w-96 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <div>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Email ID</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={loginData.emailId}
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }))
                }
              />
            </label>
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                type="text"
                className="input input-bordered w-full max-w-xs"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </label>
          </div>
          <div className="card-actions justify-center m-2">
            <button className="btn btn-primary" onClick={handleLoginBtn}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
