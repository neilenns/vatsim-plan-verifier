import { PropsWithChildren } from "react";
import { AppContext } from "./AppContext";
import { useProviderValue } from "./useProviderValue";

export const AppContextProvider = (props: PropsWithChildren) => {
  const value = useProviderValue();

  return <AppContext.Provider value={value} {...props} />;
};
