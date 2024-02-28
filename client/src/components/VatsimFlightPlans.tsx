import { useAuth0 } from "@auth0/auth0-react";
import {
  ArrowForwardOutlined as ArrowForwardOutlinedIcon,
  Stream as StreamIcon,
} from "@mui/icons-material";
import { Box, IconButton, List, ListItem, ListItemText, Stack, TextField } from "@mui/material";
import debug from "debug";
import pluralize from "pluralize";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { autoHideImportedState } from "../context/atoms";
import { useAppContext } from "../hooks/useAppContext.mjs";
import { useAudio } from "../hooks/useAudio";
import { useVatsim } from "../hooks/useVatsim.mts";
import { IVatsimFlightPlan, ImportState } from "../interfaces/IVatsimFlightPlan.mts";
import { importFlightPlan } from "../services/flightPlan.mts";
import { getColorByStatus } from "../utils/vatsim.mts";
import AlertSnackbar, { AlertSnackBarOnClose, AlertSnackbarProps } from "./AlertSnackbar";

const logger = debug("plan-verifier:vatsimFlightPlans");

const VatsimFlightPlans = () => {
  const navigate = useNavigate();
  const bellPlayer = useAudio("/bell.mp3");
  const disconnectedPlayer = useAudio("/disconnected.mp3");
  const {
    flightPlans,
    processFlightPlans,
    markPlanImported,
    hasUpdates,
    hasNew,
    setHasNew,
    setHasUpdates,
  } = useVatsim();
  // isConnected is initialized to null so useEffect can tell the difference between first page load
  // and actually being disconnected. Otherwise what happens is on page load the disconnect
  // sound will attempt to play.
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [airportCodes, setAirportCodes] = useState(
    localStorage.getItem("vatsimAirportCodes") || ""
  );
  // Issue 709: This is a non-rendering version of airportCodesRef that can get safely used in useEffect()
  // to send the airport codes to the connected socket.
  const airportCodesRef = useRef<string>(localStorage.getItem("vatsimAirportCodes") || "");
  const [isImporting, setIsImporting] = useState(false);
  const [snackbar, setSnackbar] = useState<AlertSnackbarProps>(null);
  const autoHideImported = useRecoilValue(autoHideImportedState);
  const { socket } = useAppContext();
  const { getAccessTokenSilently } = useAuth0();

  const handleSnackbarClose: AlertSnackBarOnClose = () => setSnackbar(null);

  const handleConnect = useCallback(() => {
    logger("Connected for vatsim flight plan updates");

    socket.emit("watchAirports", airportCodesRef.current?.split(","));

    setIsConnected(true);
  }, [socket]);

  const handleDisconnect = useCallback(() => {
    logger("Disconnected from vatsim flight plan updates");
    setIsConnected(false);
  }, []);

  const handleAirportNotFound = useCallback(
    (airportCodes: string[]) => {
      const message = `${pluralize("Airport", airportCodes.length)} ${airportCodes.join(
        ", "
      )} not found`;
      logger(message);
      setSnackbar({
        children: message,
        severity: "warning",
      });
      socket.disconnect();
      setIsConnected(false);
    },
    [socket]
  );

  const handleInsecureAirportCode = useCallback(
    (airportCodes: string[]) => {
      const message = `${pluralize("Airport", airportCodes.length)} ${airportCodes.join(
        ", "
      )} not valid`;
      logger(message);
      setSnackbar({
        children: message,
        severity: "error",
      });
      socket.disconnect();
      setIsConnected(false);
    },
    [socket]
  );

  const handleConnectError = useCallback((error: Error) => {
    logger(`Error connecting for vatsim flight plans: ${error.message}`);
    setSnackbar({
      children: `Unable to retrieve VATSIM flight plans.`,
      severity: "error",
    });
    setIsConnected(null); // null to avoid playing the disconnect sound.
  }, []);

  const handleReconnectError = useCallback((error: Error) => {
    logger(`Error reconnecting for vatsim flight plans: ${error.message}`);
    setSnackbar({
      children: `Unable to reconnect to server.`,
      severity: "error",
    });
    setIsConnected(null); // null to avoid playing the disconnect sound.
  }, []);

  const handleVatsimFlightPlansUpdate = useCallback(
    (incomingPlans: IVatsimFlightPlan[]) => {
      logger("Received vatsim flight plan update");
      processFlightPlans(incomingPlans);
    },
    [processFlightPlans]
  );

  useEffect(() => {
    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("connect", handleConnect);
      socket.on("disconnect", handleDisconnect);
    };
  }, [handleConnect, handleDisconnect, socket]);

  useEffect(() => {
    socket.on("vatsimFlightPlansUpdate", handleVatsimFlightPlansUpdate);

    return () => {
      socket.off("vatsimFlightPlansUpdate", handleVatsimFlightPlansUpdate);
    };
  }, [handleVatsimFlightPlansUpdate, socket]);

  useEffect(() => {
    socket.on("airportNotFound", handleAirportNotFound);
    socket.on("insecureAirportCode", handleInsecureAirportCode);
    socket.on("connect_error", handleConnectError);
    // Note the use of .io here, to get the manager. reconnect_error fires from
    // the manager, not the socket. Super annoying.
    socket.io.on("reconnect_error", handleReconnectError);

    return () => {
      socket.off("airportNotFound", handleAirportNotFound);
      socket.off("insecureAirportCode", handleInsecureAirportCode);
      socket.off("connect_error", handleConnectError);
      socket.io.off("reconnect_error", handleReconnectError);
    };
  }, [
    handleAirportNotFound,
    handleConnect,
    handleConnectError,
    handleDisconnect,
    handleInsecureAirportCode,
    handleReconnectError,
    socket,
  ]);

  useEffect(() => {
    if (hasNew || hasUpdates) {
      void bellPlayer.play();
      setHasNew(false);
      setHasUpdates(false);
    }
  }, [hasNew, hasUpdates, bellPlayer, setHasNew, setHasUpdates]);

  useEffect(() => {
    if (isConnected !== null && !isConnected) {
      void disconnectedPlayer.play();
      // Issue 644: Once the sound's played once set isConnected to null
      // so any future calls to this method due to re-renders won't cause
      // the disconnected sound to play.
      setIsConnected(null);
    }
  }, [isConnected, disconnectedPlayer]);

  const handleFlightPlanImport = async (callsign: string | undefined) => {
    if (!callsign) return;

    logger(`Importing flight plan ${callsign}`);
    setIsImporting(true);
    const token = await getAccessTokenSilently();
    importFlightPlan(token, callsign)
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

  const disconnectFromVatsim = () => {
    if (isConnected) {
      socket.disconnect();
      setIsConnected(false);
    }
  };

  const toggleVatsimConnection = () => {
    if (airportCodes === "") return;

    // Not currently connected so connect
    if (!isConnected) {
      // Clean up the airport codes
      const cleanCodes = airportCodes
        .split(",")
        .map((airportCode) => airportCode.trim())
        .join(",");

      localStorage.setItem("vatsimAirportCodes", cleanCodes);

      // Issue 709: This is set as both a state and a ref to ensure the
      // airport codes are available in the socket connected event without
      // having to add them as a useCallback() dependency.
      setAirportCodes(cleanCodes);
      airportCodesRef.current = cleanCodes;

      socket.connect();
    }
    // Currently connected so disconnect
    else {
      disconnectFromVatsim();
    }
  };

  const onIdle = () => {
    if (isConnected) {
      logger(`Inactivity detected, stopping auto-refresh.`);
      socket.disconnect();
      setIsConnected(false);
    }
  };

  const onPrompt = () => {
    if (isConnected) {
      const message = `Inactivity detected, auto-refresh will stop in five minutes.`;
      logger(message);
      setSnackbar({
        children: message,
        severity: "warning",
      });
    }
  };

  useIdleTimer({
    timeout: 1000 * 60 * 60, // 60 minutes
    promptBeforeIdle: 1000 * 60 * 55, // 55 minutes
    onIdle,
    onPrompt,
  });

  return (
    <>
      <Box sx={{ borderTop: "1px solid #ccc", mt: 2 }}>
        <Stack direction="row" sx={{ mt: 2, ml: 1 }}>
          <TextField
            label="Airport code"
            size="small"
            value={airportCodes}
            onChange={(e) => {
              setAirportCodes(e.target.value);
              disconnectFromVatsim();
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
                          handleFlightPlanImport(flightPlan.callsign).catch((err) =>
                            console.error(err)
                          );
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
                        color: getColorByStatus(flightPlan.importState, flightPlan.isCoasting),
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
