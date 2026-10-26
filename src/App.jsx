import { Navigate, Route, Routes } from "react-router";

import Body from "./components/layout/Body";
import Login from "./features/auth/Login";
import Signup from "./features/auth/Signup";
import Feed from "./features/feed/Feed";
import Profile from "./features/profile/Profile";
import Connections from "./features/connections/Connections";
import Requests from "./features/connections/Requests";
import Chat from "./features/chat/Chat";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Body />}>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route index element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/connections" element={<Connections />} />
          <Route path="/connnections" element={<Connections />} />
          <Route path="/requests" element={<Requests />} />
          <Route path="/chat/:targetUserId" element={<Chat />} />
        </Route>

        {/* Fallback catch-all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
