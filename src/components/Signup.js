import React, { useState } from 'react';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Construct the URL from the environment variable or default to a local URL
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

  async function handleSignUp(event) {
    event.preventDefault();

    try {
      const response = await fetch(`${backendUrl}/api/signup/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        setIsModalOpen(true); // Open the modal on successful sign-up
      } else {
        // Handle sign-up failure, show an error message
        const errorData = await response.json();
        setError(errorData.message);
        console.error('Sign Up failed');
      }
    } catch (error) {
      // Handle network errors, request failures, etc.
      setError('An error occurred');
      console.error('An error occurred', error);
    }
  }

  // Function to close the modal and redirect to sign-in page
  const closeModal = () => {
    setIsModalOpen(false);
    window.location.href = '/sign-in'; // Redirect to the sign-in page
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignUp}>
        <h2>Sign Up</h2>
        {error && <div className="error">{error}</div>}
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
          <label htmlFor="email">Email</label>
          <input
          type="email"
          id="email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
         />
        </div>
        <button type="submit">
          Sign Up
        </button>
        <p className="login-link">
          Already have an account? <a href="/sign-in">Log In</a>
        </p>
      </form>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Sign Up Successful</h2>
            <p>Your sign-up was successful. You can now log in.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
