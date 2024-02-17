import { useAuth0 } from "@auth0/auth0-react";
import { Box, CircularProgress, useColorScheme } from "@mui/material";
import { useEffect } from "react";

const LogoutPage = () => {
  const { logout } = useAuth0();
  const { setMode } = useColorScheme();

  useEffect(() => {
    const handleSignout = async () => {
      // Set the theme back to light, otherwise local state still has
      // dark mode in it even when the user logs out.
      setMode("light");
      await logout({
        logoutParams: {
          returnTo: window.location.origin,
        },
      });
    };

    handleSignout().catch((err) => console.error(err));
  }, [logout, setMode]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );
};

export default LogoutPage;
