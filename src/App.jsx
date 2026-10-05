import { Route, Routes } from "react-router";

import Body from "./components/layout/Body";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import Feed from "./features/feed/Feed";
import Profile from "./features/profile/Profile";
import Connections from "./features/connections/Connections";
import Requests from "./features/connections/Requests";
import Chat from "./features/chat/Chat";

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
