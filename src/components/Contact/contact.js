import React, { useContext, useState } from 'react';
import Header from '../Header/Header-Emp';
import TheFooter from '../Footer/Thefooter';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Perform input validation (you can customize this according to your needs)
    if (formData.name === '' || formData.email === '' || formData.phone === '' || formData.message === '') {
      alert('Please fill in all fields');
      return;
    }

    // If all fields are filled, you can proceed with sending the form data
    // For now, we'll just log the data to the console as an example
    console.log('Name: ' + formData.name);
    console.log('Email: ' + formData.email);
    console.log('Phone: ' + formData.phone);
    console.log('Message: ' + formData.message);

    // You can add code here to send the form data to your server or perform other actions
  };

  return (
    <div>
    <Header/>
    <div className="contact-form">
      
      <div style={{ display: 'flex', justifyContent: 'center' }}> 
      <h2>Contact Us</h2> </div>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="phone">Phone:</label>
        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>

        <div style={{ display: 'flex', justifyContent: 'center' }}> 
        <button type="button" onClick={handleSubmit}>Submit</button> </div>
      </form>
    </div> 
    <TheFooter > </TheFooter>
    </div>
  );
};

export default ContactForm;
