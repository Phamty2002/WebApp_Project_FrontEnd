import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import avatar from '../../images/logo.jpg';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { fetchOrderHistory } from '../../Services/orderService';
import { IconButton, Dialog, DialogContent, DialogTitle, TextField, DialogActions } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';

function Header() {
  
  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };

  const appBarStyle = {
    backgroundColor: '#D4B487',
    marginTop: '0px',
  };

  const buttonStyle = {
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    margin: '8px 16px',
    padding: '6px 16px',
  };

  const [open, setOpen] = useState(false);

  // Function to retrieve user data from localStorage
  const getUserFromLocalStorage = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };

  const handleOpen = async () => {
    const user = getUserFromLocalStorage();
    if (user && user.id) {
      try {
        const response = await fetchOrderHistory(user.id);
        setOrderHistory(response.data);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    }
    setOpen(true);
  };

  return (
    <AppBar position="static" sx={appBarStyle}>
      <Toolbar>
        <Box display="flex" alignItems="center">
          <Link to="/home-default" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img src={avatar} alt="Logo" width="70" height="70" />
            <Typography
              variant="h6"
              sx={{
                marginLeft: 2,
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
        <Box display="flex" flexGrow={1} justifyContent="flex-end">
          
          <Link to="/home-default" style={linkStyle}>
            <Button color="inherit" sx={buttonStyle}>
              Home
            </Button>
          </Link>
          <Link to="/menu-default" style={linkStyle}>
            <Button color="inherit" sx={buttonStyle}>
              Menu
            </Button>
          </Link>
          <Link to="/about-default" style={linkStyle}>
            <Button color="inherit" sx={buttonStyle}>
              About Us
            </Button>
          </Link>
          {/* Added Contact link */}
          <Link to="/contact-default" style={linkStyle}>
            <Button color="inherit" sx={buttonStyle}>
              Contact
            </Button>
          </Link>
          
          <Link to="/sign-in" style={linkStyle}>
            <Button color="inherit" sx={buttonStyle}>
              Sign In
            </Button>
          </Link>
          </Box>
        
      </Toolbar>


      {/* Display selected order details in a dialog */}
      
    </AppBar>
  );
}

export default Header;
