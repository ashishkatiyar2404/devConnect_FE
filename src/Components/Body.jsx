import { Outlet, useNavigate } from "react-router";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect } from "react";
import axios from "axios";
import { LOCAL_HOST_BASE_URL } from "../utils/constants";
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
        const response = await axios.get(
          LOCAL_HOST_BASE_URL + "/profile/view",
          {
            withCredentials: true,
          },
        );
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
