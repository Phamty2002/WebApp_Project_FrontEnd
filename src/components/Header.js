import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AvatarButton from './AvatarButton';
import avatar from '../images/logo.jpg';
import { Link } from 'react-router-dom';

function Header() {
  const linkStyle = {
    textDecoration: 'none', // Prevents the default underline
    color: 'inherit', // Keeps the default text color
  };

  const appBarStyle = {
    backgroundColor: '#B470D4',
    marginTop: '0px', // Add margin to the top of the AppBar
  };

  const buttonStyle = {
    margin: '8px 16px', // Add margin to the top and sides of buttons
  };

  return (
    <AppBar position="static" sx={appBarStyle}>
      <Toolbar>
        <Box display="flex" alignItems="center">
          <Link to="/home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src={avatar} alt="Logo" width="70" height="70" />
            <Typography variant="h6" sx={{ marginLeft: 2, color: '#FFFFFF' }}>
              Rose Petal Bistro
            </Typography>
          </Link>
        </Box>
        <Box display="flex" flexGrow={1} justifyContent="flex-end">
          <Link to="/home" style={linkStyle}>
            <Button color="inherit" sx={buttonStyle}>
              Home
            </Button>
          </Link>
          <Link to="/menu" style={linkStyle}>
            <Button color="inherit" sx={buttonStyle}>
              Menu
            </Button>
          </Link>
          <Link to="/about" style={linkStyle}>
            <Button color="inherit" sx={buttonStyle}>
              About Us
            </Button>
          </Link>
          {/* Added Contact link */}
          <Link to="/contact" style={linkStyle}>
            <Button color="inherit" sx={buttonStyle}>
              Contact
            </Button>
          </Link>
          <AvatarButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
