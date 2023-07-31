import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { serverUrl } from "../configs/planVerifierServer.mts";
import IFlightPlan from "../interfaces/IFlightPlan.mts";
import { Publish as PublishIcon } from "@mui/icons-material";
import { List, ListItem, IconButton, ListItemText } from "@mui/material";

const VatsimFlightPlans = () => {
  const [flightPlans, setData] = useState<IFlightPlan[]>([]);

  useEffect(() => {
    const socket = socketIOClient(serverUrl);

    socket.on("vatsimFlightPlansUpdate", (vatsimPlans: IFlightPlan[]) => {
      setData(vatsimPlans);
    });

    socket.emit("setAirport", "KSEA");

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

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
                  console.log(`Importing flight plan ${flightPlan._id ?? ""}`);
                }}
              >
                <PublishIcon />
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
