import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button } from "@mui/material";

interface ErrorProps {
  children: React.ReactElement;
}

const ErrorDisplay = ({ children }: ErrorProps) => {
  const { logout, isAuthenticated } = useAuth0();

  const handleSignout = async () => {
    await logout({
      logoutParams: {
        returnTo: window.location.origin,
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
      <img src="/appicon.svg" alt="Airplane taking off" width="128" height="128" />
      {children}
      {isAuthenticated && (
        <Button
          size="large"
          style={{ marginTop: "8px" }}
          onClick={() => {
            void (async () => {
              await handleSignout();
            })();
          }}
        >
          Sign out
        </Button>
      )}
    </Box>
  );
};

export default ErrorDisplay;
