// src/components/InvoiceManagement.js
import React, { useState } from 'react';
import Header from '../Header/Header-Emp';
import Sidebar from '../Header/SideBar';
import './Invoice-emp.css'

const InvoiceManagement = () => {
  const [orderId, setOrderId] = useState('');
  const [message, setMessage] = useState('');
  const [pdfUrl, setPdfUrl] = useState(''); // State to hold the PDF file URL
  const backendUrl = process.env.REACT_APP_BACKEND_URL;
  const [retrieveMessage, setRetrieveMessage] = useState('');
  const [deleteMessage, setDeleteMessage] = useState('');

  const [deleteOrderId, setDeleteOrderId] = useState('');


  const handleRetrieveInvoice = () => {
    // Make a GET request to retrieve the invoice PDF using backendUrl
    fetch(`${backendUrl}/api/invoice-emp/${orderId}`, {
      method: 'GET',
    })
    .then((response) => {
        if (response.ok) {
          setPdfUrl(response.url);
          setRetrieveMessage('');
        } else {
          setRetrieveMessage('Failed to retrieve invoice');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setRetrieveMessage('An error occurred');
      });
    };

  const handleDeleteInvoice = () => {
    fetch(`${backendUrl}/api/invoice-emp/${deleteOrderId}`, {
      method: 'DELETE',
    })
    .then((response) => {
        if (response.ok) {
          setDeleteMessage('Invoice deleted successfully');
          setPdfUrl('');
        } else {
          setDeleteMessage('Failed to delete invoice');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setDeleteMessage('An error occurred');
      });
    };
    

    return (
        <div>
          <Sidebar />
          <Header />
          <div className="container">
            <h1>Invoice Management</h1>
            <div className="cards-container">
              <div className="card">
                <h2>Retrieve Invoice</h2>
                <div>
                  <label>Order ID: </label>
                  <input
                    type="text"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </div>
                <button onClick={handleRetrieveInvoice}>Retrieve Invoice</button>
                {retrieveMessage && <p>{retrieveMessage}</p>}
                {pdfUrl && (
                  <iframe
                    title="Invoice PDF"
                    src={pdfUrl}
                    width="100%"
                    height="500px"
                    frameBorder="0"
                  ></iframe>
                )}
              </div>
              <div className="card">
                <h2>Delete Invoice</h2>
                <div>
                  <label>Order ID: </label>
                  <input
                    type="text"
                    value={deleteOrderId}
                    onChange={(e) => setDeleteOrderId(e.target.value)}
                  />
                </div>
                <button onClick={handleDeleteInvoice}>Delete Invoice</button>
                {deleteMessage && <p>{deleteMessage}</p>}
              </div>
            </div>
          </div>
        </div>
      );
                };

export default InvoiceManagement;
