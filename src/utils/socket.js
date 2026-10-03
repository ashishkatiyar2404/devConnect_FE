import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => io(BASE_URL);
