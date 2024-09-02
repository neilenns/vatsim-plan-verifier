import { useAuth0 } from "@auth0/auth0-react";
import {
  DarkMode as DarkModeIcon,
  Help as HelpIcon,
  LightMode as LightModeIcon,
  VolumeOff as MutedIcon,
  Settings as SettingsIcon,
  VolumeMute as UnmutedIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography,
  useColorScheme,
} from "@mui/material";
import { useState } from "react";
import { Form, Link, Outlet, useNavigate } from "react-router-dom";
import ActiveFlightPlans from "../components/ActiveFlightPlans";
import NavMenu from "../components/NavMenu";
import { SettingsDialog } from "../components/SettingsDialog";
import VatsimFlightPlans from "../components/VatsimFlightPlans";
import { AirportFlow } from "../interfaces/ISIDInformation.mts";
import { putUserInfo } from "../services/user.mts";
import { useRecoilState } from "recoil";
import { flowState, mutedState } from "../context/atoms";

const Verifier = () => {
  const { mode, setMode } = useColorScheme();
  const [flow, setFlow] = useRecoilState(flowState);
  const [muted, setMuted] = useRecoilState(mutedState);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const toggleDarkMode = async () => {
    // Set the color mode right away then worry about saving it back to the
    // database.
    const colorMode = mode === "light" ? "dark" : "light";
    setMode(colorMode);

    // Save it back to the database so when users log in elsewhere it
    // remembers the theme.
    const token = await getAccessTokenSilently();
    await putUserInfo(token, {
      colorMode,
    });
  };

  const toggleMuted = () => {
    setMuted(!muted);
  };

  const onFlowChanged = (event: SelectChangeEvent) => {
    setFlow(event.target.value as AirportFlow);
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
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="airport-flow-label">Flow</InputLabel>
            <Select
              labelId="airport-flow-label"
              id="airport-flow"
              value={flow}
              label="Flow"
              onChange={onFlowChanged}
            >
              <MenuItem value={"UNKNOWN"}>Unknown</MenuItem>
              <MenuItem value={"NORTH"}>North</MenuItem>
              <MenuItem value={"SOUTH"}>South</MenuItem>
              <MenuItem value={"EAST"}>East</MenuItem>
              <MenuItem value={"WEST"}>West</MenuItem>
            </Select>
          </FormControl>
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
            onClick={() => {
              void (async () => {
                await toggleDarkMode();
              })();
            }}
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
            <VatsimFlightPlans />
          </Box>
          <Box sx={{ overflow: "auto", height: "40%" }}>
            <ActiveFlightPlans />
          </Box>
        </Box>
        {/* Main Content */}
        <Box sx={{ flex: 1, padding: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Verifier;
