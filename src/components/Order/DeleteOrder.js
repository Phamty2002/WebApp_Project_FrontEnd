// src/components/DeleteOrder.js
import React, { useState } from 'react';
import { deleteOrder } from '../../Services/orderService';
import './DeleteOrder.css';


const DeleteOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await deleteOrder(orderId);
            setMessage('Order deleted successfully');
        } catch (error) {
            setMessage('Failed to delete order');
            console.error(error);
        }
    };

    return (
        <div className="deleteOrder-container">
            <form onSubmit={handleSubmit} className="deleteOrder-form">
                <input
                    type="text"
                    className="deleteOrder-input"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter Order ID"
                    required
                />
                <button type="submit" className="deleteOrder-button">Delete Order</button>
            </form>
            {message && <p className="deleteOrder-message">{message}</p>}
        </div>
    );
}

export default DeleteOrder;
