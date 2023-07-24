import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2"; // Grid version 2
import { Form, Link, Outlet } from "react-router-dom";
import ActiveFlightPlans from "../components/ActiveFlightPlans";
import { useCallback, useEffect } from "react";
import axios from "axios";
import { serverUrl } from "../configs/planVerifierServer.mts";
import ILoginResponse from "../interfaces/ILoginResponse.mts";

export default function App() {
  // This works but feels like it should be done with a react router action and fetcher?
  const verifyUser = useCallback(() => {
    axios
      .post<ILoginResponse>(
        new URL("refreshToken", serverUrl).toString(),
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
          },
        }
      )
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setTimeout(verifyUser, 5 * 60 * 1000);
      })
      .catch(() => {
        localStorage.removeItem("token");
      });
  }, []);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Plan verifier
          </Typography>
          <Form method="post">
            <Button color="inherit" type="submit" name="intent" value="logout">
              Logout
            </Button>
          </Form>
        </Toolbar>
      </AppBar>

      {/* Core page */}
      <Box sx={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <Box sx={{ width: 200, backgroundColor: "#f0f0f0" }}>
          <Grid xs={2} sx={{ mt: 2, ml: 2 }}>
            <Form>
              <Box textAlign="center">
                <Button variant="contained" component={Link} to="/flightPlan/new">
                  New
                </Button>
              </Box>
            </Form>
            <ActiveFlightPlans />
          </Grid>
        </Box>
        {/* Main Content */}
        <Box sx={{ flex: 1, padding: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
