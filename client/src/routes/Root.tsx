import {
  Container,
  CssBaseline,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2"; // Grid version 2
import React from "react";
import { Link, Outlet } from "react-router-dom";
import { Delete } from "@mui/icons-material";

const defaultTheme = createTheme();

const activeFlightPlans = [
  {
    _id: "64b3ff176ee86c992f24e3c1",
    callsign: "NKS4292",
    departure: "KPDX",
    arrival: "KSMF",
  },
  {
    _id: "64b34d5093b383ad3131d7ff",
    callsign: "SWA1578",
    departure: "KSEA",
    arrival: "KOAK",
  },
  {
    _id: "64b89529614b990bb092266b",
    callsign: "ACA559",
    departure: "KPDX",
    arrival: "CYVR",
  },
];

export default function Root() {
  const [selectedFlightPlanId, setSelectedFlightPlanId] = React.useState("");

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    index: string
  ) => {
    setSelectedFlightPlanId(index);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Grid container>
        <Grid xs={2}>
          <List dense aria-label="Active flight plans">
            {activeFlightPlans.map((flightPlan) => {
              return (
                <ListItem
                  key={flightPlan._id}
                  disablePadding
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                      <Delete />
                    </IconButton>
                  }
                >
                  <ListItemButton
                    component={Link}
                    to={`/flightPlan/${flightPlan._id}`}
                    selected={selectedFlightPlanId === flightPlan._id}
                    onClick={(event) => handleListItemClick(event, flightPlan._id)}
                  >
                    <ListItemText
                      primary={flightPlan.callsign}
                      secondary={`${flightPlan.departure}-${flightPlan.arrival}`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
            <ListItem />
          </List>
        </Grid>
        <Grid xs>
          <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
            <Outlet />
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
