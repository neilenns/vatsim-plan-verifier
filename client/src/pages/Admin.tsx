import {
  AppBar,
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useColorScheme,
} from "@mui/material";
import { People as PeopleIcon } from "@mui/icons-material";
import { Link, Outlet } from "react-router-dom";
import NavMenu from "../components/NavMenu";
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon } from "@mui/icons-material";

const AdminPage = () => {
  const { mode, setMode } = useColorScheme();

  const toggleDarkMode = () => {
    mode === "light" ? setMode("dark") : setMode("light");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* AppBar */}
      <AppBar position="static" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Plan verifier administration
          </Typography>
          <IconButton
            onClick={toggleDarkMode}
            aria-label={mode === "dark" ? "Turndark mode off" : "Turn dark mode on"}
          >
            {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}{" "}
          </IconButton>
          <NavMenu />
        </Toolbar>
      </AppBar>

      {/* Core page */}
      <Box sx={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <Box sx={{ width: 200 }}>
          <List>
            <ListItemButton component={Link} to="users">
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
  );
};

export default AdminPage;
