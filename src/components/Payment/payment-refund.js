import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Header/SideBar';
import Header from '../Header/Header-Emp';
import './payment-refund.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;


function RefundForm() {
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');

  const handleOrderIdChange = (event) => {
    setOrderId(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make a POST request to your API to process the refund
    axios.post(`${backendUrl}/api/payment/refund`, { orderId })
      .then((response) => {
        setMessage(response.data);
        toast.success('Order refunded successfully.');

      })
      .catch((error) => {
        setMessage(`Error: ${error.response ? error.response.data : error.message}`);
      });
  };

  return (
    <div>
        <Sidebar/>
        <Header/>

    <div className="card-refund-container">
      <div className="card-refund">
        <h2>Refund Processing</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="orderId">Order ID:</label>
            <input
              type="text"
              id="orderId"
              value={orderId}
              onChange={handleOrderIdChange}
              required
            />
          </div>
          <button type="submit">Process Refund</button>
        </form>
        <div>
          <p>{message}</p>
        </div>
      </div>
    </div>
    <ToastContainer />
    </div>
  );
}

export default RefundForm;
