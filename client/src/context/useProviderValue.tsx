import { useState, useMemo } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import { ENV } from "../env.mts";

export const useProviderValue = () => {
  const [socket] = useState<Socket>(
    socketIOClient(ENV.VITE_SERVER_URL, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      auth: { token: ENV.VITE_API_KEY },
    })
  );

  return useMemo(
    () => ({
      socket,
    }),
    [socket]
  );
};
