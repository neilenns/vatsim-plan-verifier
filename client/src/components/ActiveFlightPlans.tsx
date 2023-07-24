import { useState } from "react";
import IActiveFlightPlan from "../interfaces/IActiveFlightPlan.mts";
import { Link, useFetcher, useLoaderData } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import { List, ListItem, IconButton, ListItemButton, ListItemText } from "@mui/material";

const ActiveFlightPlans: React.FC = () => {
  const [selectedFlightPlanId, setSelectedFlightPlanId] = useState("");
  const activeFlightPlans = useLoaderData() as IActiveFlightPlan[];
  const fetcher = useFetcher();

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: string
  ) => {
    setSelectedFlightPlanId(index);
  };

  return (
    <fetcher.Form method="post">
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
                  value={activePlan.flightPlanId}
                  // This feels incredibly hacky but it works for getting the information
                  // to the react router action to do the removal.
                  onClick={() => {
                    const hiddenInput = document.querySelector<HTMLInputElement>(
                      'input[name="flightPlanId"]'
                    );
                    if (hiddenInput) {
                      hiddenInput.value = activePlan.flightPlanId;
                    }
                  }}
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
      <input hidden name="flightPlanId" />
    </fetcher.Form>
  );
};

export default ActiveFlightPlans;
