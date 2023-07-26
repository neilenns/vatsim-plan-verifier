import { useAuth0 } from "@auth0/auth0-react";
import { Box, Typography, Button } from "@mui/material";

const WelcomePage = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    void loginWithRedirect({
      appState: {
        returnTo: "/verifier",
      },
    });
  };

  const handleSignUp = () => {
    void loginWithRedirect({
      appState: {
        returnTo: "/verifier",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

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
        onClick={handleLogin}
      >
        Login
      </Button>
      <Button size="large" style={{ marginTop: "8px" }} onClick={handleSignUp}>
        Signup
      </Button>
    </Box>
  );
};

export default WelcomePage;
