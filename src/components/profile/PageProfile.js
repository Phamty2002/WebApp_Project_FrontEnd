// PageProfile.js
import React, { useState } from 'react';
import '../profile/PageProfile.Module.css'; // Assuming your CSS file is named PageProfile.css
import jwt_decode from "jwt-decode";
import Header from '../Header/Header-Emp';
const backendUrl = process.env.REACT_APP_BACKEND_URL;
import TheFooter from '../Footer/Thefooter';

// Modal component
const Modal = ({ show, children, onClose }) => {
    if (!show) {
      return null;
    } }

const PageProfile = () => {
  // State for getting profile
  const [getUsername, setGetUsername] = useState('');
  const [profile, setProfile] = useState(null);
  const [getError, setGetError] = useState('');

  // State for updating profile
  const [updateUsername, setUpdateUsername] = useState('');
  const [email, setEmail] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');
  const [updateError, setUpdateError] = useState('');

  // State for listing users
  const [userList, setUserList] = useState([]);
  const [listError, setListError] = useState('');


  
  const handleGetProfile = async () => {
    setGetError('');
    setProfile(null);
    try {
      const response = await fetch(`${backendUrl}/api/profile/${getUsername}`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.e30.EBjxM2QTMEzL3qu-gslV05xyMa1j-YMubrUsvTYm5bg'
        }
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
      } else {
        throw new Error(data.message || 'Error retrieving profile');
      }
    } catch (err) {
      setGetError(err.message);
    }
  };

  const handleUpdateProfile = async () => {
    setUpdateError('');
    setUpdateMessage('');
    try {
      const response = await fetch(`${backendUrl}/api/profile/${updateUsername}`, { // Removed the extra slash
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.e30.EBjxM2QTMEzL3qu-gslV05xyMa1j-YMubrUsvTYm5bg'
        },
        body: JSON.stringify({ email: email })
      });
  
      if (response.ok) {
        const data = await response.json();
        setUpdateMessage(data.message);
      } else {
        // The response was not ok and we assume it might not be JSON
        const text = await response.text(); // Get response text which may not be JSON
        try {
          const data = JSON.parse(text); // Try to parse it as JSON
          throw new Error(data.message || 'Error updating profile');
        } catch (jsonParseError) {
          // The response was not JSON, handle it as a generic error or log the text
          throw new Error('The server response was not in JSON format.');
        }
      }
    } catch (err) {
      setUpdateError(err.message);
    }
  };

   // Function to list users
   const handleListUsers = async () => {
    setListError('');
    try {
      const response = await fetch(`${backendUrl}/api/profile/`, {
        method: 'GET',
        headers: {
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.e30.EBjxM2QTMEzL3qu-gslV05xyMa1j-YMubrUsvTYm5bg'
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUserList(data);
      } else {
        throw new Error(data.message || 'Error listing users');
      }
    } catch (err) {
      setListError(err.message);
    }
  };

  return (
    <>
      <Header />
      <div className="profile-page">
        <div className="card-container">
          <div className="card get-profile-card">
            <h2>View Profile User </h2>
            <input
              className="input-field"
              type="text"
              value={getUsername}
              onChange={(e) => setGetUsername(e.target.value)}
              placeholder="Enter username"
            />
            <button className="action-button" onClick={handleGetProfile}>Get Profile</button>
            {profile && <pre>{JSON.stringify(profile, null, 2)}</pre>}
            {getError && <p className="error-message">{getError}</p>}
          </div>

          <div className="card update-profile-card">
            <h2>Update Profile User</h2>
            <input
              className="input-field"
              type="text"
              value={updateUsername}
              onChange={(e) => setUpdateUsername(e.target.value)}
              placeholder="Enter username"
            />
            <input
              className="input-field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter new email"
            />
            <button className="action-button" onClick={handleUpdateProfile}>Update Profile</button>
            {updateMessage && <p className="success-message">{updateMessage}</p>}
            {updateError && <p className="error-message">{updateError}</p>}
          </div>

          <div className="card list-users-card">
            <h2>List Users</h2>
            <button className="action-button" onClick={handleListUsers}>List Users</button>
            <ul>
              {userList.map(user => (
                <li key={user.id}>
                  Username: {user.username}<br />
                  Email: {user.email}<br />
                  Role: {user.role}
                </li>
              ))}
            </ul>
            {listError && <p className="error-message">{listError}</p>}
          </div>
        </div>
      </div>
      <TheFooter />
    </>
  );
};

export default PageProfile;