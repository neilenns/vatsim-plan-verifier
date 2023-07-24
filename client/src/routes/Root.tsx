import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2"; // Grid version 2
import { Form, Link, Outlet } from "react-router-dom";
import ActiveFlightPlans from "../components/ActiveFlightPlans";

const defaultTheme = createTheme();

export default function Root() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* AppBar */}
        <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" component="div">
              Plan verifier
            </Typography>
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
    </ThemeProvider>
  );
}
