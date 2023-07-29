import { IconButton, Menu, MenuItem } from "@mui/material";
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
        {localStorage.getItem("role") === "admin" && (
          <MenuItem onClick={handleClose} component={Link} to="/admin">
            Admin
          </MenuItem>
        )}
        <MenuItem onClick={handleClose} component={Link} to="/verifier">
          Verifier
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/logout">
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default NavMenu;
