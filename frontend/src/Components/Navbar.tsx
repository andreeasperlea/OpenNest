import React, { useEffect } from 'react';
import './Navbar.css';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import {useAuthStore} from "../stores/authStore";

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { user, fetchUser, logout } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <MenuIcon />
        </Button>
        <div className="logo">OpenNest</div>
      </div>

      <div className="navbar-right">
        {user && <span className="username">Hi, {user.username}</span>}
      </div>

      <Menu
        id="simple-menu"
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={handleClose}>My Account</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem
          onClick={() => {
            logout().then(() => window.location.reload());
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Navbar;
