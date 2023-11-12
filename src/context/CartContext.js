import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const apiBaseUrl = process.env.REACT_APP_BACKEND_URL; // Use environment variable for the API's base URL

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const placeOrder = async (userId, addressShipping) => {
        const items = cartItems.map(({ id, quantity }) => ({ productId: id, quantity }));
        try {
            const response = await axios.post(`${apiBaseUrl}/orders`, { userId, items, addressShipping });
            clearCart();
            return response.data;
        } catch (error) {
            console.error("Error placing order:", error);
            throw error;
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, placeOrder }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
