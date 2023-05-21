import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAppSelector } from "../store/store";

const SocketConnectionHook = () => {
  const { authToken } = useAppSelector((item) => item.authReducer);
  const [socketConnection, setSocketConnection] = useState<any>(null);
  useEffect(() => {
    const socket =
      authToken &&
      io("http://localhost:303", {
        transports: ["websocket"],
        query: {
          authorization: authToken,
        },
      });
    socket?.on("connect", () => {
      console.log("Socket connected!");
    });

    socket?.on("disconnect", () => {
      console.log("Socket disconnected!");
    });
    setSocketConnection(socket);
  }, [authToken]);
  return {
    socketConnection: socketConnection,
  };
};
export default SocketConnectionHook;
