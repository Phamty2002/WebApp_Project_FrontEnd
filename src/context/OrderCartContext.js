import React, { createContext, useState } from 'react';

export const OrderCartContext = createContext();

export const OrderCartContextProvider = ({ children }) => {
    const [orderItems, setOrderItems] = useState([]);

    // Function to add an item to the order
    const addToOrder = (item) => {
        setOrderItems(prevItems => {
            // Check if the item is already in the order
            const existingItem = prevItems.find(i => i.productId === item.productId);
            if (existingItem) {
                // If it exists, update the quantity
                return prevItems.map(i => 
                    i.productId === item.productId ? {...i, quantity: i.quantity + 1} : i
                );
            } else {
                // If not, add the new item
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    // Function to remove an item from the order
    const removeFromOrder = (productId) => {
        setOrderItems(prevItems => prevItems.filter(i => i.productId !== productId));
    };

    // Function to finalize and place the order
    const finalizeOrder = async (userId, addressShipping) => {
        const backendUrl = process.env.REACT_APP_BACKEND_URL;
        const orderDetails = {
            userId,
            items: orderItems,
            addressShipping,
        };

        try {
            const response = await fetch(`${backendUrl}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderDetails),
            });

            if (!response.ok) {
                throw new Error('Error placing order');
            }

            const data = await response.json();
            console.log('Order placed:', data);

            // Clear the order items from state after successful order placement
            setOrderItems([]);
        } catch (error) {
            console.error('Error in finalizing order:', error);
        }
    };

    return (
        <OrderCartContext.Provider value={{ orderItems, addToOrder, removeFromOrder, finalizeOrder }}>
            {children}
        </OrderCartContext.Provider>
    );
};
