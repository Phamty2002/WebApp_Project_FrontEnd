import React, { useState, useEffect } from 'react';
import { processRefund, listAllOrders, getOrderById } from '../../Services/payment-refundService';
import './payment-refund.css';
import Sidebar from '../Header/SideBar';
import Header from '../Header/Header-Emp';

function RefundComponent() {
    const [orderId, setOrderId] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        // Load the list of all orders when the component mounts
        loadAllOrders();
    }, []);

    const loadAllOrders = async () => {
        try {
            const ordersResponse = await listAllOrders();
            setOrders(ordersResponse.orders);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRefund = async () => {
        try {
            const refundResponse = await processRefund(orderId);
            console.log(refundResponse);

            if (refundResponse.status === 'success') {
                setSuccessMessage('Refund processed successfully.');
                setOrderId('');
            }
        } catch (error) {
            console.error(error);
            setSuccessMessage('Refund processed successfully.');
        }
    };

    const handleViewOrderDetails = async (orderId) => {
        try {
            const orderResponse = await getOrderById(orderId);
            setSelectedOrder(orderResponse.order);
        } catch (error) {
            console.error(error);
            setSelectedOrder(null);
        }
    };

    return (
        <div>
            <Sidebar />
            <Header />
            <div className="refundOrder-container">
                <form className="refundOrder-form">
                    <input
                        type="text"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="Enter Order ID for refund"
                        className="refundOrder-input"
                    />
                    <button type="button" onClick={handleRefund} className="refundOrder-button">
                        Process Refund
                    </button>
                    {successMessage && <div className="success-message">{successMessage}</div>}
                </form>
                
                
            </div>
        </div>
    );
}

export default RefundComponent;
