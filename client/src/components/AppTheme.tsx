import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import useAppContext from "../context/AppContext";
import { useCallback, useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const defaultTheme = createTheme({
  typography: {
    fontFamily: "Inter Variable",
  },
});

const darkTheme = createTheme({
  typography: {
    fontFamily: "Inter Variable",
  },
  palette: {
    mode: "dark",
  },
});

const AppTheme = ({ children }: Props): JSX.Element => {
  const { darkMode, setDarkMode } = useAppContext();

  // Watch for changes to local storage for darkMode and update the state if it changes.
  const syncDarkMode = useCallback(
    (event: StorageEvent) => {
      if (event.key === "darkMode") {
        setDarkMode(event.newValue === "true");
      }
    },
    [setDarkMode]
  );

  // Register for events on local storage to watch for cross-tab dark mode changes.
  useEffect(() => {
    window.addEventListener("storage", syncDarkMode);
    return () => {
      window.removeEventListener("storage", syncDarkMode);
    };
  }, [syncDarkMode]);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
