import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import axios from "axios";
import "../utils/socket";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

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
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
