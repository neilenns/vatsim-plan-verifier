import { AppBar, Box, IconButton, Toolbar, Typography, useColorScheme } from "@mui/material";
import { Link } from "react-router-dom";
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Help as HelpIcon,
  VolumeMute as UnmutedIcon,
  VolumeOff as MutedIcon,
} from "@mui/icons-material";
import NavMenu from "../components/NavMenu";
import useAppContext from "../context/AppContext";
import VatsimEDCTFlightPlans from "../components/EDCTFlightPlans";
import { useEffect, useState } from "react";
import { DateTime } from "luxon";

const EDCT = () => {
  const { mode, setMode } = useColorScheme();
  const { muted, setMuted } = useAppContext();
  const [currentTime, setCurrentTime] = useState<DateTime>(DateTime.utc());

  useEffect(() => {
    // Update current time every minute
    const intervalId = setInterval(() => {
      setCurrentTime(DateTime.utc());
    }, 1000); // 1000 milliseconds = 1 second

    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures effect runs only once on mount

  const toggleDarkMode = () => {
    mode === "light" ? setMode("dark") : setMode("light");
  };

  const toggleMuted = () => {
    setMuted(!muted);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            EDCT planning
          </Typography>
          <Typography sx={{ mr: 1 }}>
            {currentTime?.toLocaleString(DateTime.TIME_24_SIMPLE)}
          </Typography>
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
        <VatsimEDCTFlightPlans />
      </Box>
    </Box>
  );
};

export default EDCT;
