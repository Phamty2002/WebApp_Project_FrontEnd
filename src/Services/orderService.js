// src/services/orderService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const placeOrder = (userId, items, addressShipping) => {
    return axios.post(`${API_URL}/api/orders`, { userId, items, addressShipping });
};

export const getOrder = (orderId) => {
    return axios.get(`${API_URL}/api/orders/${orderId}`);
};

export const updateOrder = (orderId, updates) => {
    return axios.put(`${API_URL}/api/orders/${orderId}`, updates);
};

export const deleteOrder = (orderId) => {
    return axios.delete(`${API_URL}/api/orders/${orderId}`);
};

export const fetchOrderHistory = (userId) => {
    return axios.get(`${API_URL}/api/orders/user/${userId}`);
};
