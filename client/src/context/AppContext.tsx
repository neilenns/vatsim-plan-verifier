import { PropsWithChildren, createContext, useMemo, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import { ENV } from "../env.mts";

const useProviderValue = () => {
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

type Context = ReturnType<typeof useProviderValue>;

export const AppContext = createContext<Context | undefined>(undefined);
AppContext.displayName = "AppContext"; // For debugging

export const AppContextProvider = (props: PropsWithChildren) => {
  const value = useProviderValue();

  return <AppContext.Provider value={value} {...props} />;
};
