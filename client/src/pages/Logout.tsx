import { Box, CircularProgress } from "@mui/material";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import http from "../utils/http.mts";
import ILoginResponse from "../interfaces/ILoginResponse.mts";
import debug from "debug";

const logger = debug("plan-verifier:logout");

export default function LogoutPage() {
  const navigate = useNavigate();

  const logout = useCallback(async () => {
    await http
      .get<ILoginResponse>("logout")
      .catch(() => {
        logger("User is already logged out.");
      }) // We don't have to do anything on errors.
      .finally(() => {
        localStorage.clear();
        localStorage.setItem("logout", Date.now().toString());
        navigate("/");
      });
  }, [navigate]);

  useEffect(() => {
    void logout();
  }, [logout]);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <CircularProgress />
    </Box>
  );
}
