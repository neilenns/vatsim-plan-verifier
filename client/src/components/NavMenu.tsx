import { Divider, IconButton, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";

const NavMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="menu-button"
        title="Menu"
        aria-controls={open ? "nav-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="nav-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "menu-button",
        }}
      >
        {localStorage.getItem("role") === "admin" && [
          <MenuItem key="admin" onClick={handleClose} component={Link} to="/admin">
            Admin
          </MenuItem>,
          <Divider key="divider2" />,
          <MenuItem key="verifier" onClick={handleClose} component={Link} to="/verifier">
            Verifier
          </MenuItem>,
        ]}
        <MenuItem
          key="quickreference"
          onClick={handleClose}
          component={Link}
          to="/quickreference"
          target="_blank"
          rel="noopener noreferrer"
        >
          Quick reference
        </MenuItem>
        <Divider key="divider2" />
        <MenuItem key="logout" onClick={handleClose} component={Link} to="/logout">
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NavMenu;
