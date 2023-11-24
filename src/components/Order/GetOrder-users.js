// src/components/GetOrder.js
import React, { useState } from 'react';
import { getOrder } from '../../Services/orderService';
import './GetOrder-users.css';
import Header from '../Header/Header-User';
import TheFooter from '../Footer/Thefooter';
import { processPayment } from '../../Services/paymentService';

const GetOrder = () => {
    const [orderId, setOrderId] = useState(''); // State to store Order ID
    const [orderDetails, setOrderDetails] = useState(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentAmount, setPaymentAmount] = useState('');
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);
const [toastMessage, setToastMessage] = useState('');


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


    const handlePayment = async (e) => {
    e.preventDefault();
    try {
        const paymentData = {
            orderId: Number(orderId), // Convert orderId to Number
            amount: parseFloat(paymentAmount), // Ensure amount is a float
            paymentMethod: paymentMethod
        };

        console.log('Sending payment data:', paymentData); // Log data being sent

        const response = await processPayment(paymentData);
        console.log('API response:', response); // Log API response

        // Only reset form states after a successful API response
        setPaymentAmount('');
        setPaymentMethod('');
        setShowPaymentForm(false);

        setToastMessage('Payment processed successfully. Order status updated to Delivering.');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);

        setOrderDetails(prevDetails => ({
            ...prevDetails,
            order: {
              ...prevDetails.order,
              status: 'Delivering' // Update the status in your state
            }
          }));
        // Additional logic after successful payment
    } catch (error) {
        console.error('Payment processing error:', error);
        let errorMessage = 'Failed to process payment.';
        if (error.response && error.response.headers.get('Content-Type').includes('application/json')) {
            // Only parse as JSON if the content type is correct
            errorMessage += ` ${await error.response.json().then(data => data.error)}`;
        } else {
            // Handle non-JSON responses or other errors
            errorMessage += ` ${error.message}`;
        }
        setToastMessage('The Payment Amount is not correct. Please ensure and fill again');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    }
};



    return (
        <div>
            <Header />
            <div className="getOrder-container">
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
                    <div>
                        <div className="order-content">
                            <div className="order-details">
                                <h3>Order Details:</h3>
                                <p><strong>Order ID:</strong> {orderDetails.order.id}</p>
                                <p><strong>Order Date:</strong> {orderDetails.order.order_date}</p>
                                <p><strong>Username:</strong> {orderDetails.order.username}</p>
                                <p><strong>Email:</strong> {orderDetails.order.email}</p>
                                <p><strong>Address Shipping:</strong> {orderDetails.order.addressShipping}</p>
                                <p><strong>Status:</strong> {orderDetails.order.status}</p>
                                <p><strong>Payment Status:</strong> {orderDetails.order.payment_status}</p>
                                <p><strong>Payment Method:</strong> {orderDetails.order.payment_method}</p>
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
                        <button 
                            className="getOrder-button"
                            onClick={() => setShowPaymentForm(true)}
                        >
                            Payment
                        </button>
                    </div>
                )}
    
              {showPaymentForm && (
                <form onSubmit={handlePayment} className="getOrder-form">
                    <input
                        type="text"
                        className="getOrder-input"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="Enter Order ID"
                        required
                        disabled
                    />
                    <input
                        type="number"
                        className="getOrder-input"
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        placeholder="Enter Payment Amount"
                        required
                    />
                    <select 
                        className="getOrder-input"
                        value={paymentMethod} 
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        required
                    >
                        <option value="">Select Payment Method</option>
                        <option value="Credit Card">Credit Card</option>
                        <option value="Cash">Cash</option>
                        <option value="Internet Banking">Internet Banking</option>
                    </select>
                    <button type="submit" className="getOrder-button">Confirm Payment</button>
                </form>
            )}
               {showToast && (
    <div className={`toast-notification ${showToast ? 'show' : ''}`}>
        {toastMessage}
    </div>
)}
        </div>
        <TheFooter />
    </div>
);
              };

export default GetOrder;
