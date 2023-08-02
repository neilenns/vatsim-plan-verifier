import { useEffect, useRef, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import { apiKey, serverUrl } from "../configs/planVerifierServer.mts";
import IFlightPlan from "../interfaces/IFlightPlan.mts";
import { ArrowForwardOutlined as ArrowForwardOutlinedIcon } from "@mui/icons-material";
import {
  List,
  ListItem,
  IconButton,
  ListItemText,
  Box,
  Stack,
  TextField,
  Snackbar,
} from "@mui/material";
import debug from "debug";
import { importFlightPlan } from "../services/flightPlan.mts";
import { useNavigate } from "react-router-dom";
import { Stream as StreamIcon } from "@mui/icons-material";
import { Close as CloseIcon } from "@mui/icons-material";

const logger = debug("plan-verifier:vatsimFlightPlans");

const VatsimFlightPlans = () => {
  const navigate = useNavigate();
  const [flightPlans, setData] = useState<IFlightPlan[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [airportCode, setAirportCode] = useState(localStorage.getItem("vatsimAirportCode") || "");
  const [isImporting, setIsImporting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const socketRef = useRef<Socket | null>(null);

  const handleSnackbarClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

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

    socketRef.current.on("airportNotFound", (airportCode: string) => {
      logger(`Airport ${airportCode} not found`);
      setSnackbarMessage(`Airport ${airportCode} not found.`);
      setSnackbarOpen(true);
      setIsConnected(false);
    });

    socketRef.current.on("connect_error", (error: Error) => {
      logger(`Error from vatsim flight plan updates: ${error.message}`);
      setSnackbarMessage(`Unable to retrieve VATSIM flight plans.`);
      setSnackbarOpen(true);
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
        logger(`Error importing flight plan ${callsign}`);
      })
      .finally(() => {
        setIsImporting(false);
      });
  };

  const toggleVatsimConnection = () => {
    if (airportCode === "") return;

    // Not currently connected so connect
    if (!isConnected && socketRef.current) {
      setData([]);
      socketRef.current.connect();
      logger("Connected for vatsim flight plan updates");

      socketRef.current.emit("setAirport", airportCode.toUpperCase());
      localStorage.setItem("vatsimAirportCode", airportCode.toUpperCase());
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
              defaultValue={airportCode ?? undefined}
              onChange={(e) => {
                setAirportCode(e.target.value);
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};

export default VatsimFlightPlans;
