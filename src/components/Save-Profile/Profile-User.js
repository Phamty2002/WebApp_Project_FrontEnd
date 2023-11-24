import React, { useState, useEffect } from 'react';

function ProfileUser() {
  const [userData, setUserData] = useState({ username: '', phone_number: '', email: '' });
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);

      // Fetch user details from the API
      fetch(`${backendUrl}/api/saveprofile/${user.id}`)
        .then(response => response.json())
        .then(data => {
          // Assuming the API returns an object with username, phone_number, and email
          setUserData({
            username: data.username,
            phone_number: data.phone_number,
            email: data.email
          });
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-details">
        <p><strong>Username:</strong> {userData.username}</p>
        <p><strong>Phone Number:</strong> {userData.phone_number}</p>
        <p><strong>Email:</strong> {userData.email}</p>
      </div>
    </div>
  );
}

export default ProfileUser;
