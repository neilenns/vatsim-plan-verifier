import { AppBar, Box, Button, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { Form, Link, Outlet } from "react-router-dom";
import ActiveFlightPlans from "../components/ActiveFlightPlans";
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Help as HelpIcon,
} from "@mui/icons-material";
import NavMenu from "../components/NavMenu";
import useAppContext from "../context/AppContext";
import VatsimFlightPlans from "../components/VatsimFlightPlans";

export default function Verifier() {
  const { darkMode, setDarkMode } = useAppContext();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Plan verifier
          </Typography>
          <IconButton component={Link} to="/help" target="_blank" rel="noopener noreferrer">
            <HelpIcon />
          </IconButton>
          <IconButton
            onClick={toggleDarkMode}
            aria-label={darkMode ? "Turndark mode off" : "Turn dark mode on"}
          >
            {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          <NavMenu />
        </Toolbar>
      </AppBar>

      {/* Core page */}
      <Box sx={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <Box sx={{ width: 200 }}>
          <Stack sx={{ mt: 2 }}>
            <Form>
              <Box textAlign="center">
                <Button variant="contained" component={Link} to="/verifier/flightPlan/new">
                  New
                </Button>
              </Box>
            </Form>
            <Box sx={{ borderTop: "1px solid #ccc", mt: 2 }}>
              <ActiveFlightPlans />
            </Box>
            <Box sx={{ borderTop: "1px solid #ccc", mt: 2 }}>
              <VatsimFlightPlans />
            </Box>
          </Stack>
        </Box>
        {/* Main Content */}
        <Box sx={{ flex: 1, padding: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
