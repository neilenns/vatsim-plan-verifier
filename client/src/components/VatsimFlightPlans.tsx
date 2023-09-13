import { useEffect, useRef, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import { apiKey, serverUrl } from "../configs/planVerifierServer.mts";
import { ImportState, IVatsimFlightPlan } from "../interfaces/IVatsimFlightPlan.mts";
import { ArrowForwardOutlined as ArrowForwardOutlinedIcon } from "@mui/icons-material";
import {
  List,
  ListItem,
  IconButton,
  ListItemText,
  Box,
  Stack,
  TextField,
  FormControlLabel,
  Switch,
} from "@mui/material";
import debug from "debug";
import { importFlightPlan } from "../services/flightPlan.mts";
import { useNavigate } from "react-router-dom";
import { Stream as StreamIcon } from "@mui/icons-material";
import pluralize from "pluralize";
import AlertSnackbar, { AlertSnackBarOnClose, AlertSnackbarProps } from "./AlertSnackbar";
import { getColorByStatus, processFlightPlans } from "../utils/vatsim.mts";
import { useAudio } from "./AudioHook";
import useAppContext from "../context/AppContext";

const logger = debug("plan-verifier:vatsimFlightPlans");

const VatsimFlightPlans = () => {
  const navigate = useNavigate();
  const bellPlayer = useAudio("/bell.mp3");
  const disconnectedPlayer = useAudio("/disconnected.mp3");
  const [flightPlans, setFlightPlans] = useState<IVatsimFlightPlan[]>([]);
  // isConnected is initialized to null so useEffect can tell the difference between first page load
  // and actually being disconnected. Otherwise what happens is on page load the disconnect
  // sound will attempt to play.
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [airportCodes, setAirportCodes] = useState(
    localStorage.getItem("vatsimAirportCodes") || ""
  );
  const [isImporting, setIsImporting] = useState(false);
  const [hasNew, setHasNew] = useState(false);
  const [hasUpdates, setHasUpdates] = useState(false);
  const [snackbar, setSnackbar] = useState<AlertSnackbarProps>(null);
  const { autoHideImported } = useAppContext();
  const socketRef = useRef<Socket | null>(null);

  const handleSnackbarClose: AlertSnackBarOnClose = () => setSnackbar(null);

  useEffect(() => {
    if (hasNew || hasUpdates) {
      void bellPlayer.play();
      setHasNew(false);
      setHasUpdates(false);
    }
  }, [hasNew, hasUpdates, bellPlayer]);

  useEffect(() => {
    if (isConnected !== null && !isConnected) {
      void disconnectedPlayer.play();
    }
  }, [isConnected, disconnectedPlayer]);

  useEffect(() => {
    socketRef.current = socketIOClient(serverUrl, {
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: 5,
      auth: { token: apiKey },
    });

    socketRef.current.on("vatsimFlightPlansUpdate", (vatsimPlans: IVatsimFlightPlan[]) => {
      logger("Received vatsim flight plan update");
      // This just feels like a giant hack to get around the closure issues of useEffect and
      // useState not having flightPlans be the current value every time the update event is received.
      setFlightPlans((currentPlans) => {
        const result = processFlightPlans(currentPlans, vatsimPlans);
        setHasNew(result.hasNew);
        setHasUpdates(result.hasUpdates);
        return result.flightPlans;
      });
    });

    socketRef.current.on("connect", () => {
      logger("Connected for vatsim flight plan updates");
      setIsConnected(true);
    });

    socketRef.current.on("disconnect", () => {
      logger("Disconnected from vatsim flight plan updates");
      setIsConnected(false);
    });

    socketRef.current.on("airportNotFound", (airportCodes: string[]) => {
      const message = `${pluralize("Airport", airportCodes.length)} ${airportCodes.join(
        ", "
      )} not found`;
      logger(message);
      setSnackbar({
        children: message,
        severity: "warning",
      });
      socketRef.current?.disconnect();
      setIsConnected(false);
    });

    socketRef.current.on("insecureAirportCode", (airportCodes: string[]) => {
      const message = `${pluralize("Airport", airportCodes.length)} ${airportCodes.join(
        ", "
      )} not valid`;
      logger(message);
      setSnackbar({
        children: message,
        severity: "error",
      });
      socketRef.current?.disconnect();
      setIsConnected(false);
    });

    socketRef.current.on("connect_error", (error: Error) => {
      logger(`Error connecting for vatsim flight plans: ${error.message}`);
      setSnackbar({
        children: `Unable to retrieve VATSIM flight plans.`,
        severity: "error",
      });
      setIsConnected(null); // null to avoid playing the disconnect sound.
    });

    // Note the use of .io here, to get the manager. reconnect_error fires from
    // the manager, not the socket. Super annoying.
    socketRef.current.io.on("reconnect_error", (error: Error) => {
      logger(`Error reconnecting for vatsim flight plans: ${error.message}`);
      setSnackbar({
        children: `Unable to reconnect to server.`,
        severity: "error",
      });
      setIsConnected(null); // null to avoid playing the disconnect sound.
    });

    // Make sure to disconnect when we are cleaned up
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  // Finds the callsign in the list of current plans, sets its
  // state to imported, then updates the state variable so the
  // page redraws.
  const markPlanImported = (callsign: string) => {
    const planIndex = flightPlans.findIndex((plan) => plan.callsign === callsign);
    if (planIndex !== -1) {
      const updatedFlightPlans = [...flightPlans];

      updatedFlightPlans[planIndex].importState = ImportState.IMPORTED;
      setFlightPlans(updatedFlightPlans);
    }
  };

  const handleFlightPlanImport = (callsign: string | undefined) => {
    if (!callsign) return;

    logger(`Importing flight plan ${callsign}`);
    setIsImporting(true);
    importFlightPlan(callsign)
      .then((result) => {
        if (!result) return;

        markPlanImported(callsign);
        logger(`Flight plan ${callsign} imported successfully`);
        navigate(`/verifier/flightPlan/${result._id!}`, { replace: true });
      })
      .catch(() => {
        const message = `Error importing flight plan ${callsign}`;
        logger(message);
        setSnackbar({
          children: message,
          severity: "error",
        });
      })
      .finally(() => {
        setIsImporting(false);
      });
  };

  const toggleVatsimConnection = () => {
    if (airportCodes === "") return;

    // Not currently connected so connect
    if (!isConnected && socketRef.current) {
      setFlightPlans([]);
      socketRef.current.connect();
      logger("Connected for vatsim flight plan updates");

      // Clean up the airport codes
      const cleanCodes = airportCodes
        .split(",")
        .map((airportCode) => airportCode.trim())
        .join(",");

      socketRef.current.emit("watchAirports", cleanCodes.split(","));
      localStorage.setItem("vatsimAirportCodes", cleanCodes);
      setAirportCodes(cleanCodes);
    }
    // Currently connected so disconnect
    else if (socketRef.current) {
      socketRef.current.disconnect();
      setIsConnected(false);
    }
  };

  return (
    <>
      <Box sx={{ borderTop: "1px solid #ccc", mt: 2 }}>
        <form>
          <Stack direction="row" sx={{ mt: 2, ml: 1 }}>
            <TextField
              label="Airport code"
              size="small"
              value={airportCodes}
              onChange={(e) => {
                setAirportCodes(e.target.value);
                if (isConnected) toggleVatsimConnection();
              }}
            />
            <IconButton
              onClick={toggleVatsimConnection}
              color={isConnected ? "primary" : "default"}
              title={isConnected ? "Disconnect" : "Connect"}
            >
              <StreamIcon />
            </IconButton>
          </Stack>
        </form>
        {flightPlans.length > 0 && (
          <List dense aria-label="Vatsim flight plans" sx={{ ml: 2 }}>
            {flightPlans
              // Issue 630: Filter out imported flight plans, but only if auto-hide imported
              // is enabled in settings.
              .filter(
                (flightPlan) =>
                  !autoHideImported ||
                  (autoHideImported && flightPlan.importState !== ImportState.IMPORTED)
              )
              .map((flightPlan) => {
                return (
                  <ListItem
                    key={flightPlan._id}
                    disablePadding
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="import"
                        type="submit"
                        name="intent"
                        value="importFlightPlan"
                        disabled={isImporting}
                        onClick={() => {
                          handleFlightPlanImport(flightPlan.callsign);
                        }}
                      >
                        <ArrowForwardOutlinedIcon />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={flightPlan.callsign}
                      primaryTypographyProps={{
                        fontWeight: "bold",
                        fontStyle: flightPlan.isPrefile ? "italic" : "",
                        color: getColorByStatus(flightPlan.importState),
                      }}
                      secondary={`${flightPlan.departure ?? ""}-${flightPlan.arrival ?? ""}`}
                    />
                  </ListItem>
                );
              })}
            <ListItem />
          </List>
        )}
      </Box>
      <AlertSnackbar {...snackbar} onClose={handleSnackbarClose} />
    </>
  );
};

export default VatsimFlightPlans;
