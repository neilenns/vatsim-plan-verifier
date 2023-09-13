import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useColorScheme,
} from "@mui/material";
import { Form, Link, Outlet, useNavigate } from "react-router-dom";
import ActiveFlightPlans from "../components/ActiveFlightPlans";
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Help as HelpIcon,
  VolumeMute as UnmutedIcon,
  VolumeOff as MutedIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import NavMenu from "../components/NavMenu";
import VatsimFlightPlans from "../components/VatsimFlightPlans";
import useAppContext from "../context/AppContext";
import { useState } from "react";
import { SettingsDialog } from "../components/SettingsDialog";

export default function Verifier() {
  const { mode, setMode } = useColorScheme();
  const { muted, setMuted } = useAppContext();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    mode === "light" ? setMode("dark") : setMode("light");
  };

  const toggleMuted = () => {
    setMuted(!muted);
  };

  const onNewClick = () => {
    navigate("/verifier/flightPlan/new", { replace: true });
  };

  const onSettingsClick = () => {
    setSettingsOpen(true);
  };

  const onSettingsClose = () => {
    setSettingsOpen(false);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <SettingsDialog open={settingsOpen} onClose={onSettingsClose} />
      {/* AppBar */}
      <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Plan verifier
          </Typography>
          <IconButton onClick={onSettingsClick}>
            <SettingsIcon />
          </IconButton>
          <IconButton
            component={Link}
            to="/help"
            title="Help"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HelpIcon />
          </IconButton>
          <IconButton onClick={toggleMuted} aria-label={muted ? "unmute" : "mute"}>
            {muted ? <MutedIcon /> : <UnmutedIcon />}
          </IconButton>
          <IconButton
            onClick={toggleDarkMode}
            aria-label={mode === "dark" ? "Turndark mode off" : "Turn dark mode on"}
          >
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
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
              <Button variant="contained" onClick={onNewClick}>
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
