import React, { useState } from 'react';


function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  async function handleSignUp(event) {
    event.preventDefault();

    try {
      const response = await fetch('/api/signup/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (response.ok) {
        // Handle successful sign-up here, e.g., redirect to a new page
        window.location.href = '/sign-in'; // Redirect to the home page after sign-up
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

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
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
        <button type="submit" onClick={openModal}>
          Sign Up
        </button>
        <p className="login-link">
          Already have an account ? <a href="/sign-in">Log In</a>
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
