import { Route, Routes } from "react-router";

import Body from "./Components/Body";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Feed from "./Components/Feed";
import Profile from "./Components/Profile";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";
import Chat from "./Components/Chat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Body />}>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/connnections" element={<Connections />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/chat/:targetUserId" element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default App;
