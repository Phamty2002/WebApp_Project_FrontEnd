import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './SideBar.css';

function Dropdown({ label, children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li>
            <button onClick={() => setIsOpen(!isOpen)}>{label}</button>
            {isOpen && <ul>{children}</ul>}
        </li>
    );
}

function Sidebar() {
    return (
        <div className="sidebar">
            <h2>Dashboard</h2>
            <ul>
                <li><Link to="/home-emp">Home</Link></li>
                <li><Link to="/profile">Users Management</Link></li>
                <li><Link to="/crud">Products Management</Link></li>
                <Dropdown label="Orders Management">
                <li><Link to="/place-order">Add Order</Link></li>
                <li><Link to="/get-order">Retrieve Order</Link></li>
                <li><Link to="/update-order">Update Order</Link></li>
                <li><Link to="/delete-order">Delete Order</Link></li>
                </Dropdown>
                <li><Link to="">Settings</Link></li>
                <li><Link to="/sign-in"><strong>Sign Out</strong></Link></li>
                
            </ul>
        </div>
    );
}

export default Sidebar;
