import { useColorScheme } from "@mui/material";
import { PropsWithChildren, createContext, useEffect, useMemo, useState } from "react";
import { useImmer } from "use-immer";
import { IAuth0User } from "../interfaces/IAuth0User.mts";
import { AirportFlow } from "../interfaces/ISIDInformation.mts";

// Loads the initial flow from local storage and converts it to an AirportFlow type
const getInitialFlow = (): AirportFlow => {
  const storedFlow = localStorage.getItem("flow");

  if (storedFlow && Object.values(AirportFlow).includes(storedFlow as AirportFlow)) {
    return storedFlow as AirportFlow;
  }

  return AirportFlow.Unknown;
};

const useProviderValue = () => {
  const { setMode } = useColorScheme();

  const [muted, setMuted] = useState(localStorage.getItem("muted") === "true"); // Results in a default vaue of false
  const [flow, setFlow] = useState<AirportFlow>(getInitialFlow); // Results in a default vaue of false
  const [autoHideImported, setAutoHideImported] = useState(
    localStorage.getItem("autoHideImported") === "true" // Results in a default vaue of false
  );
  const [hideInformational, setHideInformational] = useState(
    localStorage.getItem("autoHideInformational") !== "false" // Results in a default vaue of true
  );
  const [streamingMode, setStreamingMode] = useState(
    localStorage.getItem("streamingMode") == "true" // Results in a default vaue of false
  );
  const [userInfo, setUserInfo] = useImmer<IAuth0User | undefined>(undefined);

  useEffect(() => {
    if (!userInfo) {
      return;
    }

    setMode(userInfo.colorMode);
  }, [setMode, userInfo]);

  useEffect(() => {
    localStorage.setItem("muted", muted.toString());
  }, [muted]);

  useEffect(() => {
    localStorage.setItem("flow", flow);
  }, [flow]);

  useEffect(() => {
    localStorage.setItem("autoHideImported", autoHideImported.toString());
  }, [autoHideImported]);

  useEffect(() => {
    localStorage.setItem("hideInformational", hideInformational.toString());
  }, [hideInformational]);

  useEffect(() => {
    localStorage.setItem("streamingMode", streamingMode.toString());
  }, [streamingMode]);

  return useMemo(
    () => ({
      muted,
      setMuted,
      autoHideImported,
      setAutoHideImported,
      hideInformational,
      setHideInformational,
      streamingMode,
      setStreamingMode,
      flow,
      setFlow,
      userInfo,
      setUserInfo,
    }),
    [muted, autoHideImported, hideInformational, streamingMode, flow, userInfo, setUserInfo]
  );
};

type Context = ReturnType<typeof useProviderValue>;

export const AppContext = createContext<Context | undefined>(undefined);
AppContext.displayName = "AppContext"; // For debugging

export const AppContextProvider = (props: PropsWithChildren) => {
  const value = useProviderValue();

  return <AppContext.Provider value={value} {...props} />;
};
