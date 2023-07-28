import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Form, Link, Outlet } from "react-router-dom";
import ActiveFlightPlans from "../components/ActiveFlightPlans";
import { useCallback, useEffect, useState } from "react";
import ILoginResponse from "../interfaces/ILoginResponse.mts";
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon } from "@mui/icons-material";
import http from "../utils/http.mts";

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

export default function Verifier() {
  const [darkMode, setDarkMode] = useState<boolean>(
    localStorage.getItem("darkmode") === "true" ? true : false
  );

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
      });
  }, []);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  const toggleDarkMode = () => {
    localStorage.setItem("darkmode", (!darkMode).toString());
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : defaultTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* AppBar */}
        <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Plan verifier
            </Typography>
            <IconButton
              onClick={toggleDarkMode}
              aria-label={darkMode ? "Turndark mode off" : "Turn dark mode on"}
            >
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <Form method="post">
              <Button color="inherit" type="submit" name="intent" value="logout">
                Logout
              </Button>
            </Form>
          </Toolbar>
        </AppBar>

        {/* Core page */}
        <Box sx={{ display: "flex", flex: 1 }}>
          {/* Sidebar */}
          <Box sx={{ width: 200 }}>
            <Grid xs={2} sx={{ mt: 2, ml: 2 }}>
              <Form>
                <Box textAlign="center">
                  <Button variant="contained" component={Link} to="/verifier/flightPlan/new">
                    New
                  </Button>
                </Box>
              </Form>
              <ActiveFlightPlans />
            </Grid>
          </Box>
          {/* Main Content */}
          <Box sx={{ flex: 1, padding: 2 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
