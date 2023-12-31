import React, { useState } from 'react';
import { getOrder } from '../../Services/orderService';
import Header from '../Header/Header-Emp';
import TheFooter from '../Footer/Thefooter';
import Sidebar from '../Header/SideBar';
import './GetOrder.css'

const GetOrder = () => {
    const [orderId, setOrderId] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await getOrder(Number(orderId));
            console.log('Order Details:', response.data); // Debugging
            setOrderDetails(response.data);
        } catch (error) {
            setError('Failed to fetch order');
            console.error('Error:', error);
        }
    };

    return (
        <div>
            
            <Sidebar/>
            <Header/>
            <div className="getOrder-container">
            <h2>Retrieve Order</h2>
                <form onSubmit={handleSubmit} className="getOrder-form">
                    <input
                        type="text"
                        className="getOrder-input"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="Enter Order ID"
                        required
                    />
                    <button type="submit" className="getOrder-button">Get Order</button>
                </form>
                {error && <p className="order-error-message">{error}</p>}

                {orderDetails && (
                    <div className="order-content">
                        <div className="order-details">
                            <h3>Order Details:</h3>
                            <p><strong>Order ID:</strong> {orderDetails.order.id}</p>
                            <p><strong>Order Date:</strong> {orderDetails.order.order_date}</p>
                            <p><strong>Username:</strong> {orderDetails.order.username}</p>
                            <p><strong>Email:</strong> {orderDetails.order.email}</p>
                            <p><strong>Address Shipping:</strong> {orderDetails.order.addressShipping}</p>
                            <p><strong>Status:</strong> {orderDetails.order.status}</p>
                            <p><strong>Payment Status: </strong>{orderDetails.order.payment_status}</p>
                            <p><strong>Total Amount: $</strong> {orderDetails.order.total_amount}</p>
                        </div>
                        <div className="order-items">
                            <p><strong>Items:</strong></p>
                            <div className="order-items-list">
                                {orderDetails.items.map((item, index) => (
                                    <div key={index} className="order-item">
                                        <p><strong>Product ID:</strong> {item.product_id}</p>
                                        <p><strong>Product Name:</strong> {item.name}</p>
                                        <p><strong>Quantity:</strong> {item.quantity}</p>
                                        {item.image_path && (
                                            <img 
                                                src={item.image_path} 
                                                alt={`Product ${item.product_id}`}
                                                className="order-item-image"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
            
        </div>
    );
};

export default GetOrder;
