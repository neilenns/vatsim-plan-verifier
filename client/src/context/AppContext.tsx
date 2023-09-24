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
};

const AppContext = createContext<AppContext>(initialContext);

export const AppContextProvider = ({ children }: Props): JSX.Element => {
  const [muted, setMuted] = useState(localStorage.getItem("muted") === "true");
  const [autoHideImported, setAutoHideImported] = useState(
    localStorage.getItem("autoHideImported") === "true"
  );
  const [hideInformational, setHideInformational] = useState(
    localStorage.getItem("autoHideInformational") !== "false" // Results in a default vaue of true
  );

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

  const value = useMemo(
    () => ({
      muted,
      setMuted,
      autoHideImported,
      setAutoHideImported,
      hideInformational,
      setHideInformational,
    }),
    [muted, autoHideImported, hideInformational]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default function AppContextConsumer() {
  return useContext(AppContext);
}
