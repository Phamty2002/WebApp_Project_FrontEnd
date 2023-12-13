// payment-refundService.js

import axios from 'axios';

export const processRefund = async (orderId) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const endpoint = `${backendUrl}/api/payment/refund`;

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ orderId }),
        });

        if (!response.ok) {
            // Handle any errors returned from the server
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to process the refund');
        }

        return response.json();
    } catch (error) {
        // Handle any exceptions during the request
        console.error('Error processing refund:', error);
        throw error;
    }
};



// Function to list all orders
export const listAllOrders = async () => {
    try {
        const response = await axios.get(`${backendUrl}/api/payment/listAll`); 
        return response.data;
    } catch (error) {
        throw error;
    }
};

