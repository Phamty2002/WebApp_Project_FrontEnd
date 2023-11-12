import React, { useState } from 'react';
import { useCart } from '../../context/CartContext'; // Adjust path as needed
import { 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  Divider,
  Typography
} from '@mui/material';

function OrderPage() {
    const { cartItems, placeOrder } = useCart();
    const [userId, setUserId] = useState('');
    const [address, setAddress] = useState('');

    const handlePlaceOrder = async () => {
        if (!userId || !address) {
            alert('Please fill in all fields');
            return;
        }

        try {
            const response = await placeOrder(userId, address);
            alert(`Order placed successfully! Order ID: ${response.orderId}`);
        } catch (error) {
            alert('Failed to place order. Please try again.');
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Your Cart</h2>
            <List>
                {cartItems.map((item, index) => (
                    <React.Fragment key={index}>
                        <ListItem>
                            <ListItemText 
                                primary={item.name} 
                                secondary={`Quantity: ${item.quantity} | Price: $${item.price}`} 
                            />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
            <TextField
                label="User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                label="Shipping Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                margin="normal"
                fullWidth
                multiline
            />
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handlePlaceOrder}
                style={{ marginTop: '20px' }}
            >
                Place Order
            </Button>
        </div>
    );
}

export default OrderPage;
