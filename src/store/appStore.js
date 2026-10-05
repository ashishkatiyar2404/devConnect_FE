import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/profile/userSlice";
import feedSlice from "../features/feed/feedSlice";
import connectionSlice from "../features/connections/connectionSlice";
import requestSlice from "../features/connections/requestSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedSlice,
    connections: connectionSlice,
    requests: requestSlice,
  },
});

export default appStore;
