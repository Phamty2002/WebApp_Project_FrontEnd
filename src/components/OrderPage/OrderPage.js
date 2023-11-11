import React, { useContext } from 'react';
import { OrderCartContext } from '../../context/OrderCartContext';
import { Button, List, ListItem, Typography } from '@mui/material';

const { orderItems, removeFromOrder, finalizeOrder } = useContext(OrderCartContext);

function OrderPage() {
  const { orderItems, removeFromOrder } = useContext(OrderCartContext);

  const handleRemoveItem = (itemId) => {
    removeFromOrder(itemId);
  };

  const handlePlaceOrder = () => {
    // Example: Finalizing the order
    finalizeOrder(userId, addressShipping);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Your Order
      </Typography>
      <List>
        {orderItems.map((item) => (
          <ListItem key={item.id}>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body1">Quantity: {item.quantity}</Typography>
            <Typography variant="body1">Price: ${item.price}</Typography>
            <Button onClick={() => handleRemoveItem(item.id)}>Remove</Button>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" color="primary" onClick={handlePlaceOrder}>
        Place Order
      </Button>
    </div>
  );
}

export default OrderPage;
