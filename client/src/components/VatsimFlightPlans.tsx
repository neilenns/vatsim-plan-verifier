import { useEffect, useRef, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import { serverUrl } from "../configs/planVerifierServer.mts";
import IFlightPlan from "../interfaces/IFlightPlan.mts";
import { ArrowForwardOutlined as ArrowForwardOutlinedIcon } from "@mui/icons-material";
import { List, ListItem, IconButton, ListItemText, Box, Stack, TextField } from "@mui/material";
import debug from "debug";
import { importFlightPlan } from "../services/flightPlan.mts";
import { useNavigate } from "react-router-dom";
import { Stream as StreamIcon } from "@mui/icons-material";

const logger = debug("plan-verifier:vatsimFlightPlans");

const VatsimFlightPlans = () => {
  const navigate = useNavigate();
  const [flightPlans, setData] = useState<IFlightPlan[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [airportCode, setAirportCode] = useState("");
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = socketIOClient(serverUrl, { autoConnect: false, reconnectionAttempts: 3 });

    socketRef.current.on("vatsimFlightPlansUpdate", (vatsimPlans: IFlightPlan[]) => {
      logger("Received vatsim flight plan update");
      setData(vatsimPlans);
    });

    socketRef.current.on("disconnect", () => {
      logger("Disconnected from vatsim flight plan updates");
      setIsConnected(false);
    });

    socketRef.current.on("reconnect", () => {
      setIsConnected(true);
    });

    socketRef.current.on("connect_error", (error: Error) => {
      logger(`Error from vatsim flight plan updates: ${error.message}`);
      setIsConnected(false);
    });
  }, []);

  const handleFlightPlanImport = (callsign: string | undefined) => {
    if (!callsign) return;

    logger(`Importing flight plan ${callsign}`);
    importFlightPlan(callsign)
      .then((result) => {
        if (!result) return;

        logger(`Flight plan ${callsign} imported successfully`);
        navigate(`/verifier/flightPlan/${result._id!}`);
      })
      .catch(() => {
        logger(`Error importing flight plan ${callsign}`);
      });
  };

  const toggleVatsimConnection = () => {
    logger("Toggling vatsim connection");
    if (airportCode === "") return;

    // Not currently connected so connect
    if (!isConnected && socketRef.current) {
      setData([]);
      logger("Connecting for vatsim flight plan updates");
      socketRef.current.connect();

      socketRef.current.emit("setAirport", airportCode.toUpperCase());
      setIsConnected(true);
    }
    // Currently connected so disconnect
    else if (socketRef.current) {
      socketRef.current.disconnect();
      setIsConnected(false);
    }
  };

  return (
    <Box sx={{ borderTop: "1px solid #ccc", mt: 2 }}>
      <form>
        <Stack direction="row" sx={{ mt: 2, ml: 1 }}>
          <TextField
            label="Airport code"
            size="small"
            onChange={(e) => {
              setAirportCode(e.target.value);
              if (isConnected) toggleVatsimConnection();
            }}
          />
          <IconButton onClick={toggleVatsimConnection} color={isConnected ? "primary" : "default"}>
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
  );
};

export default VatsimFlightPlans;
