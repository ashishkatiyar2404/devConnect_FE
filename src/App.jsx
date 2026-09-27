import { Route, Routes } from "react-router";

import Body from "./Components/Body";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Body />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
    </Routes>
  );
}

export default App;
