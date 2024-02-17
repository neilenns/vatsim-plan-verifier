import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error(`useAppContext must be used within an AppContextProvider`);
  }

  return context;
}
