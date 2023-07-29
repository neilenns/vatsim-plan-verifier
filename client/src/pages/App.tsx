import { ThemeProvider } from "@emotion/react";
import { CssBaseline, createTheme } from "@mui/material";
import { useCallback, useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ILoginResponse from "../interfaces/ILoginResponse.mts";
import http from "../utils/http.mts";
import { AppContext } from "../context/AppContext";
import { Role } from "../interfaces/IUser.mts";

const App = () => {
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
        setUser({
          role: response.data.role as Role,
        });
        localStorage.setItem("token", response.data.token);
        setTimeout(verifyUser, 5 * 60 * 1000);
      })
      .catch(() => {
        setUser(undefined);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      });
  }, []);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

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
