import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useContext,
  useMemo,
  useState,
} from "react";
import { IUser } from "../interfaces/IUser.mts";
import { AirportFlow } from "../interfaces/ISIDInformation.mts";

// This method of implementing context is based on
// https://dmitripavlutin.com/react-context-and-usecontext/
type Props = {
  children: React.ReactNode;
};

export type SetUserFunction = Dispatch<SetStateAction<Partial<IUser> | undefined>>;

type AppContext = {
  muted: boolean;
  setMuted: Dispatch<SetStateAction<boolean>>;
  autoHideImported: boolean;
  setAutoHideImported: Dispatch<SetStateAction<boolean>>;
  hideInformational: boolean;
  setHideInformational: Dispatch<SetStateAction<boolean>>;
  streamingMode: boolean;
  setStreamingMode: Dispatch<SetStateAction<boolean>>;
  flow: AirportFlow;
  setFlow: Dispatch<SetStateAction<AirportFlow>>;
};

const initialContext: AppContext = {
  muted: false,
  setMuted: () => {
    throw new Error("setMuted function must be overridden");
  },
  autoHideImported: false,
  setAutoHideImported: () => {
    throw new Error("setAutoHideImported function must be overridden");
  },
  hideInformational: true,
  setHideInformational: () => {
    throw new Error("sethideInformational function must be overridden");
  },
  streamingMode: false,
  setStreamingMode: () => {
    throw new Error("setStreamingMode function must be overridden");
  },
  flow: AirportFlow.Unknown,
  setFlow: () => {
    throw new Error("setFlow function must be overridden");
  },
};

const AppContext = createContext<AppContext>(initialContext);

export const AppContextProvider = ({ children }: Props): JSX.Element => {
  const [muted, setMuted] = useState(localStorage.getItem("muted") === "true"); // Results in a default vaue of false
  const [autoHideImported, setAutoHideImported] = useState(
    localStorage.getItem("autoHideImported") === "true" // Results in a default vaue of false
  );
  const [hideInformational, setHideInformational] = useState(
    localStorage.getItem("autoHideInformational") !== "false" // Results in a default vaue of true
  );
  const [streamingMode, setStreamingMode] = useState(
    localStorage.getItem("streamingMode") == "true" // Results in a default vaue of false
  );
  const [flow, setFlow] = useState<AirportFlow>(localStorage.getItem("flow") as AirportFlow || AirportFlow.Unknown);

  // Save to local storage so on page refresh this isn't lost. So dumb. Why do people use context?
  useEffect(() => {
    localStorage.setItem("muted", muted.toString());
  }, [muted]);

  useEffect(() => {
    localStorage.setItem("autoHideImported", autoHideImported.toString());
  }, [autoHideImported]);

  useEffect(() => {
    localStorage.setItem("hideInformational", hideInformational.toString());
  }, [hideInformational]);

  useEffect(() => {
    localStorage.setItem("streamingMode", streamingMode.toString());
  }, [streamingMode]);

  useEffect(() => {
    localStorage.setItem("flow", flow.toString());
  }, [flow]);

  const value = useMemo(
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
      setFlow
    }),
    [muted, autoHideImported, hideInformational, streamingMode, setStreamingMode, flow, setFlow]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default function AppContextConsumer() {
  return useContext(AppContext);
}
