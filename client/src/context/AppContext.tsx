import { createContext } from "react";
import { useProviderValue } from "./useProviderValue";

type Context = ReturnType<typeof useProviderValue>;

export const AppContext = createContext<Context | undefined>(undefined);
AppContext.displayName = "AppContext"; // For debugging
