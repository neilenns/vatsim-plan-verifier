import { useState } from "react";
import IActiveFlightPlan from "../interfaces/IActiveFlightPlan.mts";
import { Link, useLoaderData } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import { List, ListItem, IconButton, ListItemButton, ListItemText } from "@mui/material";
import { useAuth0 } from "@auth0/auth0-react";
import http from "../utils/http.mjs";
import { serverUrl } from "../configs/planVerifierServer.mts";

const ActiveFlightPlans: React.FC = () => {
  const [selectedFlightPlanId, setSelectedFlightPlanId] = useState("");
  const activeFlightPlans = useLoaderData() as IActiveFlightPlan[];
  const { getAccessTokenSilently } = useAuth0();

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: string
  ) => {
    setSelectedFlightPlanId(index);
  };

  const onRemoveClick = async (flightPlanId: string) => {
    const token = await getAccessTokenSilently();
    await http
      .authorized(token)
      .delete(new URL(`activeFlightPlans/${flightPlanId}`, serverUrl).toString());
  };

  return (
    <List dense aria-label="Active flight plans">
      {activeFlightPlans.map((activePlan) => {
        return (
          <ListItem
            key={activePlan.flightPlanId}
            disablePadding
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                type="submit"
                name="intent"
                value="removeFlightPlan"
                onClick={() => void onRemoveClick(activePlan.flightPlanId)}
              >
                <Delete />
              </IconButton>
            }
          >
            <ListItemButton
              component={Link}
              to={`/flightPlan/${activePlan.flightPlanId}`}
              selected={selectedFlightPlanId === activePlan.flightPlanId}
              onClick={(event) => handleListItemClick(event, activePlan.flightPlanId)}
            >
              <ListItemText
                primary={activePlan.callsign}
                secondary={`${activePlan.departure}-${activePlan.arrival}`}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
      <ListItem />
    </List>
  );
};

export default ActiveFlightPlans;
