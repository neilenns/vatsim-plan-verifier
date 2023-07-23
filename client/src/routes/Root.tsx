import {
  Box,
  Button,
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
import { Form, Link, Outlet, useLoaderData } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import IActiveFlightPlan from "../interfaces/IActiveFlightPlan.mts";

const defaultTheme = createTheme();

export default function Root() {
  const [selectedFlightPlanId, setSelectedFlightPlanId] = React.useState("");
  const activeFlightPlans = useLoaderData() as IActiveFlightPlan[];

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
        <Grid xs={2} sx={{ mt: 2, ml: 2 }}>
          <Form method="post">
            <Box textAlign="center">
              <Button variant="contained" component={Link} to="/flightPlan/new">
                New
              </Button>
            </Box>
          </Form>
          <List dense aria-label="Active flight plans">
            {activeFlightPlans.map((activePlan) => {
              return (
                <ListItem
                  key={activePlan.flightPlanId}
                  disablePadding
                  secondaryAction={
                    <IconButton edge="end" aria-label="delete">
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
