import { Box, Button, Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2"; // Grid version 2
import { Form, Link, Outlet } from "react-router-dom";
import ActiveFlightPlans from "../components/ActiveFlightPlans";

const defaultTheme = createTheme();

export default function Root() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Grid container>
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
        <Grid xs>
          <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
            <Outlet />
          </Container>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
