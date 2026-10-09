import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router";
import { DEFAULT_AVATAR } from "../../utils/constants";
import { removeUser } from "../../features/profile/userSlice";
import BrandMark from "../common/BrandMark";
import { getErrorMessage } from "../../utils/errorUtils";

const NAV_LINKS = [
  { to: "/", label: "Feed" },
  { to: "/connnections", label: "Connections" },
  { to: "/requests", label: "Requests" },
];

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isActive = (to) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return; // Prevent duplicate requests
    setIsLoggingOut(true);

    try {
      await axios.post("/logout");
    } catch (error) {
      console.error("Logout failed:", getErrorMessage(error));
    } finally {
      setIsLoggingOut(false);
      dispatch(removeUser());
      navigate("/login", { replace: true });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-base-content/10 bg-base-300/90 backdrop-blur-md">
      <div className="navbar mx-auto max-w-6xl min-h-16 px-4 sm:px-6 lg:px-8">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost h-auto min-h-0 gap-2 px-2 py-1 text-base-content hover:bg-transparent"
          >
            <BrandMark className="h-8 w-8" />
            <span className="font-display text-lg font-semibold tracking-tight">
              DevConnect
            </span>
          </Link>
        </div>

        {user && (
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`btn btn-ghost btn-sm ${
                  isActive(link.to)
                    ? "bg-primary/15 text-primary"
                    : "text-base-content/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}

        <div className="flex flex-none items-center gap-3 pl-2">
          {user ? (
            <>
              <p className="hidden text-sm text-base-content/70 lg:block">
                Welcome,{" "}
                <span className="font-medium text-base-content">
                  {user.firstName}
                </span>
              </p>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full ring-1 ring-primary/30">
                    <img
                      alt="Profile photo"
                      src={user.photoUrl || DEFAULT_AVATAR}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={-1}
                  className="menu menu-sm dropdown-content z-10 mt-3 w-52 rounded-box border border-base-content/10 bg-base-200 p-2 shadow-lg"
                >
                  <li className="md:hidden">
                    <Link to="/">Feed</Link>
                  </li>
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/connnections">Connections</Link>
                  </li>
                  <li>
                    <Link to="/requests">Requests</Link>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="text-error flex items-center gap-2"
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                    >
                      {isLoggingOut ? (
                        <>
                          <span className="loading loading-spinner loading-xs" />
                          <span>Logging out…</span>
                        </>
                      ) : (
                        "Logout"
                      )}
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            location.pathname !== "/login" && (
              <Link to="/login" className="btn btn-primary btn-sm">
                Log in
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
