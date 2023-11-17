// src/components/PlaceOrder.js
import React, { useState } from 'react';
import { placeOrder } from '../../Services/orderService';
import './PlaceOrder.css';

const PlaceOrder = () => {
    const [userId, setUserId] = useState('');
    const [items, setItems] = useState([{ productId: '', quantity: 1 }]);
    const [addressShipping, setAddressShipping] = useState('');
    const [message, setMessage] = useState('');
    const [orderId, setOrderId] = useState(null);

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = field === 'quantity' ? parseInt(value, 10) : value;
        setItems(newItems);
    };

    const addItem = () => {
        setItems([...items, { productId: '', quantity: 1 }]);
    };

    const removeItem = (index) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        setItems(newItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await placeOrder(userId, items, addressShipping);
            console.log(response.data);
            setMessage('Order placed successfully!');
            setOrderId(response.data.orderId);  
        } catch (error) {
            console.error(error);
            setMessage('Error placing order. Please check your input.');
        }
    };

    return (
        <div className="placeOrder-container">
            <form onSubmit={handleSubmit} className="placeOrder-form">
                <div className="placeOrder-form-group">
                    <label>UserID:</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Enter User ID"
                        required
                    />
                </div>
    
                {items.map((item, index) => (
                    <div key={index} className="placeOrder-form-group placeOrder-item-row">
                        <input
                            type="text"
                            value={item.productId}
                            onChange={(e) => handleItemChange(index, 'productId', e.target.value)}
                            placeholder="Product ID"
                            required
                        />
                        <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, 'quantity', e.target.value)}
                            placeholder="Quantity"
                            min="1"
                            required
                        />
                        <button type="button" onClick={() => removeItem(index)} className="placeOrder-remove-item-btn">Remove</button>
                    </div>
                ))}
                <button type="button" onClick={addItem} className="placeOrder-add-item-btn">Add Item</button>
    
                <div className="placeOrder-form-group">
                    <label>Address Shipping:</label>
                    <input
                        type="text"
                        value={addressShipping}
                        onChange={(e) => setAddressShipping(e.target.value)}
                        placeholder="Enter Shipping Address"
                        required
                    />
                </div>
    
                <button type="submit" className="placeOrder-form-group">Add to Cart</button>
            </form>
            {message && <p className="placeOrder-message">{message}</p>}
            {orderId && <p className="placeOrder-message">Order ID: {orderId}</p>}  {/* Display the order ID */}
        </div>
    );
};   

export default PlaceOrder;