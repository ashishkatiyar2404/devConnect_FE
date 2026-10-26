import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../profile/userSlice";
import { useLocation, useNavigate } from "react-router";
import BrandMark from "../../components/common/BrandMark";
import { getErrorMessage } from "../../utils/errorUtils";

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

const Login = ({ initialMode = "login" }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [loginData, setLoginData] = useState(initalLoginState);
  const [signUpData, setSignUpData] = useState(initialSignupState);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginForm, setIsLogginForm] = useState(initialMode !== "signup");

  const handleLoginBtn = async () => {
    if (isLoading) return; // Prevent duplicate requests
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("/login", loginData);
      dispatch(addUser(response.data?.data));
      const from = location.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (e) {
      setError(
        getErrorMessage(
          e,
          "Login failed. Please check your credentials and try again.",
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignupBtn = async () => {
    if (isLoading) return; // Prevent duplicate requests
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post("/signup", signUpData);

      if (response.status === 201 || response.status === 200) {
        navigate("/login");
        setIsLogginForm(true);
      }
    } catch (err) {
      setError(
        getErrorMessage(
          err,
          "Registration failed. Please verify your details and try again.",
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="grid w-full overflow-hidden rounded-2xl border border-base-content/10 bg-base-300/80 shadow-xl lg:grid-cols-2">
        <div className="hidden flex-col justify-between bg-base-200/60 p-10 lg:flex">
          <div className="flex items-center gap-3">
            <BrandMark className="h-10 w-10" />
            <span className="font-display text-xl font-semibold">
              DevConnect
            </span>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              Nightline
            </p>
            <h1 className="font-display mt-3 text-3xl font-semibold leading-tight tracking-tight">
              Meet developers who want to build.
            </h1>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-base-content/60">
              Discover people, send a signal, and chat when the match is mutual.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-base-content/75">
              <li className="flex gap-2">
                <span className="text-primary">●</span>
                Browse a curated developer feed
              </li>
              <li className="flex gap-2">
                <span className="text-primary">●</span>
                Accept requests from people you actually want to know
              </li>
              <li className="flex gap-2">
                <span className="text-primary">●</span>
                Start a live chat the moment you connect
              </li>
            </ul>
          </div>
          <p className="text-xs text-base-content/40">
            Built for late-night pairing, not endless scrolling.
          </p>
        </div>

        <div className="p-6 sm:p-8 lg:p-10">
          <div className="mb-6 flex items-center gap-3 lg:hidden">
            <BrandMark className="h-8 w-8" />
            <span className="font-display text-lg font-semibold">
              DevConnect
            </span>
          </div>

          <h2 className="font-display text-2xl font-semibold tracking-tight">
            {isLoginForm ? "Welcome back" : "Create your account"}
          </h2>
          <p className="mt-1 text-sm text-base-content/60">
            {isLoginForm
              ? "Sign in to continue your network."
              : "A few details and you are in."}
          </p>

          <div role="tablist" className="tabs tabs-box mt-6 w-full">
            <button
              type="button"
              role="tab"
              className={`tab flex-1 ${isLoginForm ? "tab-active" : ""}`}
              onClick={() => {
                if (isLoading) return;
                setLoginData(initalLoginState);
                setSignUpData(initialSignupState);
                setError("");
                setIsLogginForm(true);
              }}
              disabled={isLoading}
            >
              Login
            </button>
            <button
              type="button"
              role="tab"
              className={`tab flex-1 ${!isLoginForm ? "tab-active" : ""}`}
              onClick={() => {
                if (isLoading) return;
                setLoginData(initalLoginState);
                setSignUpData(initialSignupState);
                setError("");
                setIsLogginForm(false);
              }}
              disabled={isLoading}
            >
              Sign up
            </button>
          </div>

          <div className="mt-6 space-y-3">
            {!isLoginForm && (
              <>
                <label className="form-control w-full">
                  <span className="label-text mb-1 text-base-content/70">
                    First name
                  </span>
                  <input
                    type="text"
                    className="input input-bordered w-full bg-base-200"
                    value={signUpData.firstName}
                    onChange={(e) =>
                      setSignUpData((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      }))
                    }
                    disabled={isLoading}
                  />
                </label>
                <label className="form-control w-full">
                  <span className="label-text mb-1 text-base-content/70">
                    Last name
                  </span>
                  <input
                    type="text"
                    className="input input-bordered w-full bg-base-200"
                    value={signUpData.lastName}
                    onChange={(e) =>
                      setSignUpData((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                    disabled={isLoading}
                  />
                </label>
                <label className="form-control w-full">
                  <span className="label-text mb-1 text-base-content/70">
                    Age
                  </span>
                  <input
                    type="number"
                    className="input input-bordered w-full bg-base-200"
                    value={signUpData.age}
                    onChange={(e) =>
                      setSignUpData((prev) => ({
                        ...prev,
                        age: e.target.value,
                      }))
                    }
                    disabled={isLoading}
                  />
                </label>
              </>
            )}
            <label className="form-control w-full">
              <span className="label-text mb-1 text-base-content/70">
                Email ID
              </span>
              <input
                type="text"
                className="input input-bordered w-full bg-base-200"
                value={isLoginForm ? loginData.emailId : signUpData.emailId}
                onChange={(e) => {
                  if (isLoginForm) {
                    setLoginData((prev) => ({
                      ...prev,
                      emailId: e.target.value,
                    }));
                  } else {
                    setSignUpData((prev) => ({
                      ...prev,
                      emailId: e.target.value,
                    }));
                  }
                }}
                disabled={isLoading}
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text mb-1 text-base-content/70">
                Password
              </span>
              <input
                type="password"
                className="input input-bordered w-full bg-base-200"
                value={isLoginForm ? loginData.password : signUpData.password}
                onChange={(e) => {
                  if (isLoginForm) {
                    setLoginData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  } else {
                    setSignUpData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }
                }}
                disabled={isLoading}
              />
            </label>
          </div>

          {error && (
            <div className="alert alert-error alert-soft mt-4 text-sm">
              {error}
            </div>
          )}

          <button
            type="button"
            className="btn btn-primary mt-6 min-h-11 w-full"
            onClick={isLoginForm ? handleLoginBtn : handleSignupBtn}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm mr-2" />
                <span>{isLoginForm ? "Signing in…" : "Creating account…"}</span>
              </>
            ) : isLoginForm ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
