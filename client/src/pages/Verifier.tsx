import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
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
        <Box sx={{ width: 200, height: "100vh", display: "flex", flexDirection: "column" }}>
          <Form>
            <Box textAlign="center" sx={{ mt: 2 }}>
              <Button variant="contained" component={Link} to="/verifier/flightPlan/new">
                New
              </Button>
            </Box>
          </Form>
          <Box sx={{ overflow: "auto", height: "40%" }}>
            <ActiveFlightPlans />
          </Box>
          <Box sx={{ overflow: "auto", height: "40%" }}>
            <VatsimFlightPlans />
          </Box>
        </Box>
        {/* Main Content */}
        <Box sx={{ flex: 1, padding: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
