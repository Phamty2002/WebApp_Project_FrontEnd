import React, { useState, useEffect } from 'react';
import { processRefund } from '../../Services/payment-refundService';
import './payment-refund.css';
import Sidebar from '../Header/SideBar';
import Header from '../Header/Header-Emp';

function RefundComponent() {
    const [orderId, setOrderId] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [notifyText, setNotifyText] = useState('');

    const handleRefund = async () => {
        try {
            const refundResponse = await processRefund(orderId);
            console.log(refundResponse);

            // Show the success message after successful refund
            setShowSuccessMessage(true);

            // Set notify text based on refund response
            const refundStatus = refundResponse.status;
            if (refundStatus === 'success') {
                setNotifyText('Refund Successfully');
            } else {
                setNotifyText('Refund Failed');
            }

            // Hide the success message after 3 seconds
            setTimeout(() => {
                setShowSuccessMessage(false);
                // You can clear the input field or perform any other actions here
                setOrderId('');
            }, 3000);
        } catch (error) {
            console.error(error);
            setNotifyText('Refund Failed');
        }
    };

    useEffect(() => {
        // Clear notify text when success message is hidden
        if (!showSuccessMessage) {
            setNotifyText('');
        }
    }, [showSuccessMessage]);

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
                    {notifyText}
                </form>
                {showSuccessMessage && (
                    <div className="success-message">{notifyText}</div>
                )}
            </div>
        </div>
    );
}

export default RefundComponent;
