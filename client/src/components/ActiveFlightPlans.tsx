import { Delete } from "@mui/icons-material";
import { Box, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import { useFetcher, useLoaderData, useNavigate, useParams } from "react-router-dom";
import IActiveFlightPlan from "../interfaces/IActiveFlightPlan.mts";

const ActiveFlightPlans = () => {
  const [selectedFlightPlanId, setSelectedFlightPlanId] = useState("");
  const activeFlightPlans = useLoaderData() as IActiveFlightPlan[];
  const fetcher = useFetcher();
  const { id } = useParams();
  const navigate = useNavigate();

  // Handles setting the currently selected flight plan id based on the
  // ID in the page URL.
  useEffect(() => {
    // Used by the page to render the selected flight plan as selected
    setSelectedFlightPlanId(id ?? "");

    // Used by the action to delete the selected flight plan
    const hiddenInput = document.querySelector<HTMLInputElement>(
      'input[name="selectedFlightPlanId"]'
    );
    if (hiddenInput) {
      hiddenInput.value = id ?? "";
    }
  }, [id]);

  const handleClick = (flightPlanId: string) => {
    navigate(`/verifier/flightPlan/${flightPlanId}`, { replace: true });
  };

  return (
    activeFlightPlans.length > 0 && (
      <Box sx={{ mt: 2 }}>
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
                      name="intent"
                      value="removeFlightPlan"
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
                    onClick={() => {
                      handleClick(activePlan.flightPlanId);
                    }}
                    selected={selectedFlightPlanId === activePlan.flightPlanId}
                  >
                    <ListItemText
                      primary={activePlan.callsign}
                      primaryTypographyProps={{ fontWeight: "bold" }}
                      secondary={`${activePlan.departure}-${activePlan.arrival}`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
            <ListItem />
          </List>
          <input aria-label="hidden flight plan ID field" hidden name="flightPlanId" />
          <input
            aria-label="hidden selected flight plan ID field"
            hidden
            name="selectedFlightPlanId"
          />
        </fetcher.Form>
      </Box>
    )
  );
};

export default ActiveFlightPlans;
