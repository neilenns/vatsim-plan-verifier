import {
  AppBar,
  Box,
  CssBaseline,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
import { People as PeopleIcon } from "@mui/icons-material";
import { Outlet } from "react-router-dom";
import { useCallback, useEffect } from "react";
import ILoginResponse from "../interfaces/ILoginResponse.mts";
import http from "../utils/http.mts";
import NavMenu from "../components/NavMenu";

const defaultTheme = createTheme({
  typography: {
    fontFamily: "Inter Variable",
  },
});

export default function AdminPage() {
  const verifyUser = useCallback(() => {
    http
      .post<ILoginResponse>(
        "refreshToken",
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
        localStorage.removeItem("role");
      });
  }, []);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        {/* AppBar */}
        <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Plan verifier administration
            </Typography>
            <NavMenu />
          </Toolbar>
        </AppBar>

        {/* Core page */}
        <Box sx={{ display: "flex", flex: 1 }}>
          {/* Sidebar */}
          <Box sx={{ width: 200 }}>
            <List>
              <ListItemButton component="a" href="/admin/users">
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Users" />
              </ListItemButton>
            </List>
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
