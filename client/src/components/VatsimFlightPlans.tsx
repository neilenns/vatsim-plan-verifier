import { useEffect, useRef, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import { apiKey, serverUrl } from "../configs/planVerifierServer.mts";
import IFlightPlan from "../interfaces/IFlightPlan.mts";
import { ArrowForwardOutlined as ArrowForwardOutlinedIcon } from "@mui/icons-material";
import { List, ListItem, IconButton, ListItemText, Box, Stack, TextField } from "@mui/material";
import debug from "debug";
import { importFlightPlan } from "../services/flightPlan.mts";
import { useNavigate } from "react-router-dom";
import { Stream as StreamIcon } from "@mui/icons-material";
import pluralize from "pluralize";
import AlertSnackbar, { AlertSnackBarOnClose, AlertSnackbarProps } from "./AlertSnackbar";

const logger = debug("plan-verifier:vatsimFlightPlans");

const VatsimFlightPlans = () => {
  const navigate = useNavigate();
  const [flightPlans, setData] = useState<IFlightPlan[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [airportCodes, setAirportCodes] = useState(
    localStorage.getItem("vatsimAirportCodes") || ""
  );
  const [isImporting, setIsImporting] = useState(false);
  const [snackbar, setSnackbar] = useState<AlertSnackbarProps>(null);
  const socketRef = useRef<Socket | null>(null);

  const handleSnackbarClose: AlertSnackBarOnClose = () => setSnackbar(null);

  useEffect(() => {
    socketRef.current = socketIOClient(serverUrl, {
      autoConnect: false,
      reconnection: false,
      auth: { token: apiKey },
    });

    socketRef.current.on("vatsimFlightPlansUpdate", (vatsimPlans: IFlightPlan[]) => {
      logger("Received vatsim flight plan update");
      setData(vatsimPlans);
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
      logger(`Error from vatsim flight plan updates: ${error.message}`);
      setSnackbar({
        children: `Unable to retrieve VATSIM flight plans.`,
        severity: "error",
      });
      setIsConnected(false);
    });

    // Make sure to disconnect when we are cleaned up
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const handleFlightPlanImport = (callsign: string | undefined) => {
    if (!callsign) return;

    logger(`Importing flight plan ${callsign}`);
    setIsImporting(true);
    importFlightPlan(callsign)
      .then((result) => {
        if (!result) return;

        logger(`Flight plan ${callsign} imported successfully`);
        navigate(`/verifier/flightPlan/${result._id!}`);
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
      setData([]);
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
      setIsConnected(true);
    }
    // Currently connected so disconnect
    else if (socketRef.current) {
      socketRef.current.disconnect();
      setIsConnected(false);
    }
  };

  return (
    <div>
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
            >
              <StreamIcon />
            </IconButton>
          </Stack>
        </form>
        {flightPlans.length > 0 && (
          <List dense aria-label="Vatsim flight plans" sx={{ ml: 2 }}>
            {flightPlans.map((flightPlan) => {
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
                    primaryTypographyProps={{ fontWeight: "bold" }}
                    secondary={`${flightPlan.departure}-${flightPlan.arrival}`}
                  />
                </ListItem>
              );
            })}
            <ListItem />
          </List>
        )}
      </Box>
      <AlertSnackbar {...snackbar} onClose={handleSnackbarClose} />
    </div>
  );
};

export default VatsimFlightPlans;
