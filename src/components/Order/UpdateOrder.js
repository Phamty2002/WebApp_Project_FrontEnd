// src/components/UpdateOrder.js
import React, { useState } from 'react';
import { updateOrder } from '../../Services/orderService';
import './UpdateOrder.css';
import Sidebar from '../Header/SideBar';


const UpdateOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [status, setStatus] = useState('');
    const [addressShipping, setAddressShipping] = useState('');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateOrder(orderId, { status, addressShipping, paymentStatus });
            setMessage('Order updated successfully!');
        } catch (error) {
            console.error(error);
            setMessage('Failed to update order.');
        }
    };

    return (
        <div>
            <Sidebar/>
        <div className="updateOrder-container">
            <h2>Update Order</h2>
            <form onSubmit={handleSubmit} className="updateOrder-form">
                <div className="updateOrder-form-group">
                    <label>Order ID:</label>
                    <input
                        type="text"
                        className="updateOrder-input"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="Enter Order ID"
                        required
                    />
                </div>
                <div className="updateOrder-form-group">
                    <label>Status:</label>
                    <select 
                        value={status} 
                        onChange={(e) => setStatus(e.target.value)}
                        className="updateOrder-input"
                    >
                        <option value="">Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="Delivering">Delivering</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Not Delivered">Not Delivered</option>
                    </select>
                </div>
                {/*<div className="updateOrder-form-group">
                    <label>Shipping Address:</label>
                    <input
                        type="text"
                        className="updateOrder-input"
                        value={addressShipping}
                        onChange={(e) => setAddressShipping(e.target.value)}
                        placeholder="Enter Shipping Address"
                    />
    </div> */}
                <div className="updateOrder-form-group">
                <label>Payment Status:</label>
                <select 
                    value={paymentStatus} 
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className="updateOrder-input"
                >
                    <option value="">Select Payment Status</option>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                </select>
            </div>
                <button type="submit" className="updateOrder-button">Update Order</button>
            </form>
            {message && <p className="updateOrder-message">{message}</p>}
        </div>
        </div>
    );
    }

export default UpdateOrder;