import {
  Alert,
  AppBar,
  Box,
  Button,
  CircularProgress,
  CssBaseline,
  IconButton,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2"; // Grid version 2
import { Form, Link, Outlet } from "react-router-dom";
import ActiveFlightPlans from "../components/ActiveFlightPlans";
import { useState } from "react";
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon } from "@mui/icons-material";
import { useAuth0 } from "@auth0/auth0-react";

const defaultTheme = createTheme({});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Verifier() {
  const [darkMode, setDarkMode] = useState(false);
  const { logout, isLoading, error } = useAuth0();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    void logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error.message}</Alert>;
  }
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
            <IconButton onClick={toggleDarkMode}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <Button
              color="inherit"
              type="submit"
              name="intent"
              value="logout"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        {/* Core page */}
        <Box sx={{ display: "flex", flex: 1 }}>
          {/* Sidebar */}
          <Box sx={{ width: 200 }}>
            <Grid xs={2} sx={{ mt: 2, ml: 2 }}>
              <Form>
                <Box textAlign="center">
                  <Button variant="contained" component={Link} to="flightPlan/new">
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
