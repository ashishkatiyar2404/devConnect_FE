import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import "../../api/socket";
import NavBar from "./NavBar";
import { BASE_URL } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../features/profile/userSlice";
import Footer from "./Footer";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user) return;

    const getProfile = async () => {
      try {
        const response = await axios.get(BASE_URL + "/profile/view", {
          withCredentials: true,
        });
        dispatch(addUser(response.data.data));
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/login");
        }
        console.log(err);
      }
    };
    getProfile();
  }, []);

  return (
    <div className="flex min-h-dvh flex-col bg-base-100">
      <NavBar />
      <main className="relative flex-1">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_top,oklch(78%_0.12_175_/_0.08),transparent_60%)]" />
        <div className="relative">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Body;
