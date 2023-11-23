import React, { useState } from 'react';
import { processRefund } from '../../Services/payment-refundService';
import './payment-refund.css';
import Sidebar from '../Header/SideBar';
import Header from '../Header/Header-Emp';

function RefundComponent() {
    const [orderId, setOrderId] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleRefund = async () => {
        try {
            const refundResponse = await processRefund(orderId);
            console.log(refundResponse);

            if (refundResponse.status === 'success') {
                setSuccessMessage('Refund processed successfully.');
                setOrderId('');
            } else {
                setSuccessMessage('Refund processed successfully.');
            }
        } catch (error) {
            console.error(error);
            setSuccessMessage('Refund failed. Please try again.');
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
