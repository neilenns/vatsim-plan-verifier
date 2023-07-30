import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useContext,
  useMemo,
  useState,
} from "react";
import { IUser, Role } from "../interfaces/IUser.mts";

// This method of implementing context is based on
// https://dmitripavlutin.com/react-context-and-usecontext/
type Props = {
  children: React.ReactNode;
};

export type SetUserFunction = Dispatch<SetStateAction<Partial<IUser> | undefined>>;

type AppContext = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
};

const initialContext: AppContext = {
  darkMode: false,
  setDarkMode: () => {
    throw new Error("setDarkMode function must be overridden");
  },
};

const AppContext = createContext<AppContext>(initialContext);

export const AppContextProvider = ({ children }: Props): JSX.Element => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");

  // Save to local storage so on page refresh this isn't lost. So dumb. Why do people use context?
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  const value = useMemo(() => ({ darkMode, setDarkMode }), [darkMode]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default function AppContextConsumer() {
  return useContext(AppContext);
}
