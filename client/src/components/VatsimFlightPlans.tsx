import { MouseEventHandler, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { serverUrl } from "../configs/planVerifierServer.mts";
import IFlightPlan from "../interfaces/IFlightPlan.mts";
import { ArrowForwardOutlined as ArrowForwardOutlinedIcon } from "@mui/icons-material";
import { List, ListItem, IconButton, ListItemText } from "@mui/material";
import debug from "debug";
import { importFlightPlan } from "../services/flightPlan.mts";
import { useNavigate } from "react-router-dom";

const VatsimFlightPlans = () => {
  const navigate = useNavigate();
  const logger = debug("plan-verifier:vatsimFlightPlans");

  const [flightPlans, setData] = useState<IFlightPlan[]>([]);

  useEffect(() => {
    logger("Connecting for vatsim flight plan updates");
    const socket = socketIOClient(serverUrl);

    socket.on("vatsimFlightPlansUpdate", (vatsimPlans: IFlightPlan[]) => {
      logger("Received vatsim flight plan update");
      setData(vatsimPlans);
    });

    socket.emit("setAirport", "KSEA");

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [logger]);

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

  return (
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
  );
};

export default VatsimFlightPlans;
