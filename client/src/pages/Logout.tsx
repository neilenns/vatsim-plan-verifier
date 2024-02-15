import { useAuth0 } from "@auth0/auth0-react";
import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";

const LogoutPage = () => {
  const { logout } = useAuth0();

  useEffect(() => {
    const handleSignout = async () => {
      await logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    };

    handleSignout().catch((err) => console.error(err));
  }, [logout]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );
};

export default LogoutPage;
