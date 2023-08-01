import { useEffect, useState } from "react";
import socketIOClient, { Socket } from "socket.io-client";
import { serverUrl } from "../configs/planVerifierServer.mts";
import IFlightPlan from "../interfaces/IFlightPlan.mts";
import { ArrowForwardOutlined as ArrowForwardOutlinedIcon } from "@mui/icons-material";
import { List, ListItem, IconButton, ListItemText, Box, Stack, TextField } from "@mui/material";
import debug from "debug";
import { importFlightPlan } from "../services/flightPlan.mts";
import { useNavigate } from "react-router-dom";
import { Stream as StreamIcon } from "@mui/icons-material";

const VatsimFlightPlans = () => {
  const navigate = useNavigate();
  const logger = debug("plan-verifier:vatsimFlightPlans");
  const [flightPlans, setData] = useState<IFlightPlan[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [airportCode, setAirportCode] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    setSocket(socketIOClient(serverUrl, { autoConnect: false }));
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
    if (!isConnected && socket) {
      logger("Connecting for vatsim flight plan updates");
      socket.connect();

      socket.on("vatsimFlightPlansUpdate", (vatsimPlans: IFlightPlan[]) => {
        logger("Received vatsim flight plan update");
        setData(vatsimPlans);
      });

      socket.emit("setAirport", airportCode.toUpperCase());
      setIsConnected(true);
    }
    // Currently connected so disconnect
    else if (socket) {
      socket.disconnect();
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
