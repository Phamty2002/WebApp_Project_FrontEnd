import React, { useState } from 'react';
import '../components/Contact/contact.css';
import logo from '../images/logo.jpg';
import googleMapImage from '../images/mapImage.jpg';
import Header from './Header/Header-User';
import TheFooter from './Footer/Thefooter';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div>
      <Header/>
      <div className="contact-container">
        <div className="contact-card location-form">
          <div className="location-details">
            <img src={googleMapImage} alt="Google Map" className="map-image" />
            <div className="location-text">
              <h4>Our Location</h4>
              <p>34 Đ. Số 12, Trường Thọ, Quận 9, Thành phố Hồ Chí Minh, Việt Nam</p>
              <p><strong>Phone:</strong> 0374856574</p>
              <p><strong>Email:</strong> typwebapp@email.com</p>
            </div>
          </div>
        </div>

        <div className="contact-card contact-form">
          <form onSubmit={handleSubmit}>
            <div className="form-header">
              <img src={logo} className="logo" alt="Company Logo" />
              <h3>Contact Support</h3>
            </div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
      <TheFooter className="the-footer-class"/>
    </div>
  );
}

export default Contact;
