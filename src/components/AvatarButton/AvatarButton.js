import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../../styles/styles.css';
import avatar from '../../images/avatar.jpg';

function AvatarButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    // Sign-out logic
    localStorage.removeItem('userData');
    handleClose();
    navigate('/sign-in');
  };

  const handleManageProduct = () => {
    navigate('/crud'); // Navigate to the CrudProduct.js page
    handleClose();
  };

  const handleProfile = () => {
    navigate('/profile'); // Navigate to the CrudProduct.js page
    handleClose();
  };

  return (
    <div className="buttonContainer">
      <IconButton
        color="inherit"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar alt="Avatar" src={avatar} />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleProfile}>My Profile</MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
        <MenuItem onClick={handleManageProduct}>Manage Product</MenuItem> {/* Add the button */}
      </Menu>
    </div>
  );
}

export default AvatarButton;
