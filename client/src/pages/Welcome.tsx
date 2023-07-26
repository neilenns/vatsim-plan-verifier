import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const WelcomePage = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Typography variant="h3" gutterBottom>
        Welcome
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        style={{ marginTop: "16px" }}
        component={Link}
        to="/login"
      >
        Login
      </Button>
      <Button size="large" style={{ marginTop: "8px" }} component={Link} to="/signup">
        Sign up
      </Button>
    </Box>
  );
};

export default WelcomePage;
