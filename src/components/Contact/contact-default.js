import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from 'axios';
import './contact.css';
import Header from '../Header/Header-Default';
import Footer from '../Footer/Thefooter';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/contact/contact`, formData);
      toast.success('Message sent successfully');
      setFormData({ name: '', email: '', phone_number: '', message: '' });
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Error submitting form');
      toast.error('Error submitting form'); 
    }
  };

  return (
    <div>
      <Header></Header>
    <div className="contact-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Contact Us</h2>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
        />
        <input
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Your Phone Number"
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          required
        />
        <button type="submit">Send Message</button>
      </form>
    </div>
    <Footer></Footer>
    <ToastContainer />
    </div>
  );
};

export default ContactForm;
