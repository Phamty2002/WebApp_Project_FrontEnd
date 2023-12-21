import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showTokenForm, setShowTokenForm] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleTokenChange = (e) => {
    setToken(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your backend API to check if the email exists
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/changepassword/getPasswordToken`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        setShowTokenForm(true);
        toast.success('Email found. Please check your email for the token.');
      } else {
        toast.error('Error: Email not found. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleTokenSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage('Error: Passwords do not match.');
      return;
    }

    try {
      // Make a POST request to your backend API to reset the password with token and new password
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/changepassword/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetToken: token, newPassword, confirmPassword }),
      });

      if (response.status === 200) {
        toast.success('Password reset successful. You can now login with your new password.');
      } else {
        toast.error('Error: Could not reset password. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="card-container">
        <div className="container-forgotpassword">
          <h2>Forgot Password</h2>
          {showTokenForm ? (
            <form onSubmit={handleTokenSubmit}>
              <label htmlFor="token">Token:</label>
              <input type="text" id="token" name="token" value={token} onChange={handleTokenChange} required />
              <label htmlFor="newPassword">New Password:</label>
              <input type="password" id="newPassword" name="newPassword" value={newPassword} onChange={handleNewPasswordChange} required />
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input type="password" id="confirmPassword" name="confirmPassword" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
              <button type="submit">Submit</button>
            </form>
          ) : (
            <form onSubmit={handleEmailSubmit}>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" value={email} onChange={handleEmailChange} required />
              <button type="submit">Submit</button>
            </form>
          )}
          <div className="message">{message}</div>
          <div className="back-to-login-button">
        <Link to="/sign-in">
          <button>Back to Login</button>
        </Link>
      </div>
        </div>
        
      </div>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default ForgotPassword;
