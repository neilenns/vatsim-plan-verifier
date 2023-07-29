import { createContext, Dispatch, SetStateAction, useMemo, useState } from "react";
import { IUser } from "../interfaces/IUser.mts";

// This method of implementing context is based on
// https://dmitripavlutin.com/react-context-and-usecontext/
type Props = {
  children: React.ReactNode;
};

type AppContext = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  user?: Partial<IUser>;
  setUser: Dispatch<SetStateAction<Partial<IUser> | undefined>>;
};

const initialContext: AppContext = {
  darkMode: false,
  setDarkMode: () => {
    throw new Error("setDarkMode function must be overridden");
  },
  user: undefined,
  setUser: () => {
    throw new Error("setUser function must be overridden");
  },
};

const AppContext = createContext<AppContext>(initialContext);

const AppContextProvider = ({ children }: Props): JSX.Element => {
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<Partial<IUser>>();

  const value = useMemo(() => ({ darkMode, setDarkMode, user, setUser }), [darkMode, user]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export { AppContext, AppContextProvider };
