import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AvatarButton from '../AvatarButton/AvatarButton';
import avatar from '../../images/logo.jpg';
import { Link } from 'react-router-dom';

function Header() {
  const linkStyle = {
    textDecoration: 'none', // Prevents the default underline
    color: 'inherit', // Keeps the default text color
  };

  const appBarStyle = {
    backgroundColor: '#455769',
    marginTop: '0px', // Add margin to the top of the AppBar
  };

  const buttonStyle = {
    fontWeight: 'bold', // Makes the button text bold
    transition: 'background-color 0.3s ease', // Smooth background-color transition for hover effect
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)', // Slightly changes the background color on hover
    },
    margin: '8px 16px', // Adjusted spacing around buttons
    // If you need to increase the size of the buttons
    padding: '6px 16px', // Optional: Increases the padding inside the buttons for a larger hit area
  };

  return (
    <AppBar position="static" sx={appBarStyle}>
      <Toolbar sx={{ justifyContent: 'center' }}> {/* Center content horizontally */}
        <Box display="flex" alignItems="center">
          <Link to="/home-emp" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', marginLeft: '190px' }}>
            <img src={avatar} alt="Logo" width="100" height="100" />
            <Typography
              variant="h6"
              sx={{
                marginLeft: 5,
                color: '#FFFFFF',
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                transition: 'color 0.3s ease',
              }}
            >
              Rose Petal Bistro
            </Typography>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
  
}

export default Header;
