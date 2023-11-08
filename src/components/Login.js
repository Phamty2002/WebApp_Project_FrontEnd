import React, { useState } from 'react';
import '../styles/styles.css';

function Modal({ message, onClose }) {
  // Log to see if this component renders
  console.log('Modal rendering with message:', message);

  // Now, the modal visibility is controlled by inline style based on the `message`.
  return (
    <div className="modal" style={{ display: message ? 'flex' : 'none' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>{message}</p>
      </div>
    </div>
  );
}

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // Construct the URL from the environment variable or default to a local URL
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  async function handleLogin(event) {
    event.preventDefault();
    console.log('Handle login called');
  
    try {
      const response = await fetch(`${backendUrl}/api/login/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log('Login successful, setting message');
        setMessage('Login successful! Redirecting...');
  
        // Save the token to localStorage or sessionStorage
        localStorage.setItem('token', data.token);
  
        // Redirect to the home page after a delay
        setTimeout(() => {
          setMessage('');
  
          // Redirect based on the user's role
          const userRole = data.user.role;
          if (userRole === 'admin') {
            window.location.href = '/home-emp'; // Redirect to the employee homepage
          } else {
            window.location.href = '/home-user'; // Redirect to the customer homepage
          }
        }, 3000);
  
      } else {
        console.log('Login failed, setting error message');
        let errorMessage = data.message || 'Login Failed: username or password is not correct';
        setError(errorMessage);
        setMessage(errorMessage);
      }
    } catch (error) {
      console.error('An error occurred:', error);
      setError('An error occurred');
      setMessage('An error occurred: ' + error.message);
    }
  }
  

  return (
    <div className="login-container">
      <Modal message={message} onClose={() => setMessage('')} />
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <a href="/forgot-password" className="forgot-password-link">
            Forgot Password?
          </a>
        </div>
        <button type="submit">Sign In</button>
        <p className="signup-link">
          Don't have an account? <a href="/sign-up">Sign-Up</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
