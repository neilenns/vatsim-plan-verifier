import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { useCallback, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ILoginResponse from "../interfaces/ILoginResponse.mts";
import http from "../utils/http.mts";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  const { darkMode, setUser } = useContext(AppContext);

  const verifyUser = useCallback(() => {
    http
      .post<ILoginResponse>(
        "refreshToken",
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
          },
        }
      )
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setTimeout(verifyUser, 5 * 60 * 1000);
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setUser(undefined);
      });
  }, [setUser]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  // Watch for changes to local storage for a logout key and if it's there that
  // means the site was logged out in a different tab. Refresh the page and log out!
  const syncLogout = useCallback(
    (event: StorageEvent) => {
      if (event.key === "logout") {
        navigate("/");
      }
    },
    [navigate]
  );

  // Register for events on local storage to watch for cross-tab logout.
  useEffect(() => {
    window.addEventListener("storage", syncLogout);
    return () => {
      window.removeEventListener("storage", syncLogout);
    };
  }, [syncLogout]);

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

  return (
    <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
};

export default App;
