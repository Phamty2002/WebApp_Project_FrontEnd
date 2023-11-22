import React, { useState, } from 'react';
import { processRefund } from '../../Services/payment-refundService';
import './payment-refund.css';
import Sidebar from '../Header/SideBar';
import Header from '../Header/Header-Emp';


function RefundComponent() {
    const [orderId, setOrderId] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleRefund = async () => {
        try {
            const refundResponse = await processRefund(orderId);
            console.log(refundResponse);

            // Show the success message after successful refund
            setShowSuccessMessage(true);

            setTimeout(() => {
                setShowSuccessMessage(false);
                // You can clear the input field or perform any other actions here
                setOrderId('');
            }, 3000); // Hide the success message after 3 seconds
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Sidebar/>
            <Header/>
            <div className="refundOrder-container">
                <form className="refundOrder-form">
                    <input
                        type="text"
                        value={orderId}
                        onChange={(e) => setOrderId(e.target.value)}
                        placeholder="Enter Order ID for refund"
                        className="refundOrder-input"
                    />
                    <button onClick={handleRefund} className="refundOrder-button">
                        Process Refund
                    </button>
                </form>
                {showSuccessMessage && (
                    <div className="success-message">Refund Successfully</div>
                )}
            </div>
        </div>
    );
}

export default RefundComponent;
