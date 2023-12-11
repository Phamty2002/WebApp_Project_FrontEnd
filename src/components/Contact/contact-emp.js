// src/components/contact-emp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './contact-emp.css';
import Header from '../Header/Header-Emp';
import Sidebar from '../Header/SideBar';

const ContactManagement = () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;


    // State for listing contacts
    const [contacts, setContacts] = useState([]);

    // State for specific contact details
    const [selectedContactId, setSelectedContactId] = useState(null);
    const [selectedContact, setSelectedContact] = useState(null);

    // State for creating a new contact
    const [newContact, setNewContact] = useState({
        name: '',
        email: '',
        phone_number: '',
        message: ''
    });

    // Fetch all contacts
    useEffect(() => {
        axios.get(`${backendUrl}/api/contactcontactlist`)
            .then(response => setContacts(response.data.contacts))
            .catch(error => console.error('Error fetching contacts:', error));
    }, []);

    // Fetch specific contact details
    useEffect(() => {
        if (selectedContactId) {
            axios.get(`${backendUrl}/api/contact/contactbyId/${selectedContactId}`)
                .then(response => setSelectedContact(response.data.contact))
                .catch(error => console.error('Error fetching contact details:', error));
        }
    }, [selectedContactId]);

    // Handle new contact submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${backendUrl}/api/contact/contact`, newContact)
            .then(response => {
                console.log('Contact created:', response.data);
                // Reset form or update state as needed
            })
            .catch(error => console.error('Error creating contact:', error));
    };

    // Handle change in form fields
    const handleChange = (e) => {
        setNewContact({ ...newContact, [e.target.name]: e.target.value });
    };

    // State to control the visibility of the contact details modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch specific contact details and open modal
    const viewContactDetails = (contactId) => {
        setSelectedContactId(contactId);
        setIsModalOpen(true);
    };

    // Close the modal
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedContactId(null);
    };

    return (
        <div>
          <Sidebar />
          <Header />
        <div className="contact-management-container">
            <h1>Contact Management</h1>

            {/* List of Contacts */}
            <div className="contacts-list">
                {contacts.map(contact => (
                    <div key={contact.id} className="contact-item">
                        <h3>{contact.name}</h3>
                        <p>{contact.email}</p>
                        <button onClick={() => viewContactDetails(contact.id)}>View Details</button>
                    </div>
                ))}
            </div>


            {/* Contact Details Modal */}
            {isModalOpen && selectedContact && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{selectedContact.name}</h2>
                        <p>Email: {selectedContact.email}</p>
                        <p>Phone: {selectedContact.phone_number}</p>
                        <p>Message: {selectedContact.message}</p>
                    </div>
                </div>
            )}
        </div>
        </div>

    );
};

export default ContactManagement;
