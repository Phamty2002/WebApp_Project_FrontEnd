import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import avatar from '../../images/logo.jpg';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useUser } from '../../context/UserContext';

function Header() {
  const { userId } = useUser(); // Use the useUser hook to get the userId
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

  return (
    <AppBar position="static" sx={appBarStyle}>
      <Toolbar>
        <Box display="flex" alignItems="center">
          <Link to="/home-user" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
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
          {/* Display User ID if available */}
          {userId && (
            <Typography sx={{ marginRight: 2, color: 'white' }}>
              User ID: {userId}
            </Typography>
          )}
          <Link to="/home-user" style={linkStyle}>
            <Button color="inherit" sx={buttonStyle}>
              Home
            </Button>
          </Link>
          <Link to="/menu-user" style={linkStyle}>
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
          <Link to="/Testimonials" style={linkStyle}>
            <Button color="inherit" sx={buttonStyle}>
              Testimontials
            </Button>
          </Link>
          <Link to="/get-order-users" style={linkStyle}>
            <Button color="inherit" sx={buttonStyle}>
              <ShoppingCartIcon /> {/* Display cart icon */}
              Order Cart
            </Button>
          </Link>
          <Link to="/sign-in" style={linkStyle}>
            <Button color="inherit" sx={buttonStyle}>
              Sign Out
            </Button>
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
