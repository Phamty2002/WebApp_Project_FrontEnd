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
  const [orderHistory, setOrderHistory] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  const handleClose = () => setOpen(false);

  const handleViewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
  };

  const handleCloseOrderHistory = () => {
    setOrderHistory([]);
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
          <Link to="/get-order-users" style={linkStyle}>
            <Button color="inherit" sx={buttonStyle}>
              <ShoppingCartIcon /> {/* Display cart icon */}
              Order Cart
            </Button>
          </Link>
          <Link to="/saveprofile" style={linkStyle}>
            <Button color="inherit" sx={buttonStyle}>
              Profile
            </Button>
          </Link>
          <Link to="/home-default" style={linkStyle}>
            <Button color="inherit" sx={buttonStyle}>
              Sign Out
            </Button>
          </Link>
          </Box>
        <IconButton color="inherit" onClick={handleOpen}>
          <HistoryIcon />
        </IconButton>
      </Toolbar>

      {/* Display order history in a virtual box using Box component */}
      {orderHistory.length > 0 && (
        <Box
          sx={{
            position: 'absolute',
            top: '80px',
            right: '20px',
            padding: '20px',
            zIndex: 1000,
            backgroundColor: 'grey', // Updated background color
            borderRadius: '8px', // Updated border radius
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Updated box shadow
          }}
        >
          <Typography variant="h6">Order History:</Typography>
          <ul>
            {orderHistory.map((order) => (
              <li key={order.orderId}>
                {order.username}'s order {order.id}{' '}
                <Button
                  onClick={() => handleViewOrderDetails(order)}
                  sx={{ color: 'orange' }}
                >
                  View Details
                </Button>
              </li>
            ))}
          </ul>
          <Button onClick={handleCloseOrderHistory} sx={{ color: 'white', marginTop: '10px', }}>
            Close
          </Button>
        </Box>
      )}

      {/* Display selected order details in a dialog */}
      <Dialog open={selectedOrder !== null} onClose={handleCloseOrderDetails}>
          <DialogTitle>Order Details</DialogTitle>
          <DialogContent>
            {selectedOrder && (
              <div>
                <Typography variant="subtitle1">
                  <strong>Order ID: </strong> {selectedOrder.id}<br />
                  <strong>Date: </strong> {new Date(selectedOrder.order_date).toLocaleDateString()}<br />
                  <strong>Shipping Address: </strong> {selectedOrder.addressShipping}<br />
                  <strong>Order Status: </strong> {selectedOrder.status}<br />
                  <strong>Payment Status: </strong> {selectedOrder.payment_status}<br />
                  <strong>Payment Method: </strong> {selectedOrder.payment_method}<br />
                  <strong>Total Amount :</strong> ${selectedOrder.total_amount}<br />
                </Typography>
                <Typography variant="h6" sx={{ marginTop: 2 }}>Items:</Typography>
                <ul>
                  {selectedOrder.items.map((item) => (
                    <li key={item.product_id}>{item.name} - Quantity: {item.quantity}</li>
                  ))}
                </ul>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseOrderDetails}>Close</Button>
          </DialogActions>
      </Dialog>
    </AppBar>
  );
}

export default Header;
