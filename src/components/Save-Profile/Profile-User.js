import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../Header/Header-User';
import Footer from '../Footer/Thefooter';
import './Profile-User.css';
import Avatar from 'react-avatar';

function ProfileUser() {
  const [userData, setUserData] = useState({ id: '', username: '', phone_number: '', email: '' });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newEmail, setNewEmail] = useState('');


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
          // Assuming the API returns an object with id, username, phone_number, and email
          setUserData({
            id: data.id,
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

  const handleChangePassword = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/changepassword/password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userData.id,
          oldPassword: oldPassword,
          newPassword: newPassword
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setOldPassword('');
        setNewPassword('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast.error('Error changing password');
    }
  };

  const handleUpdateInfo = async () => {
    try {
      // Assuming you have an endpoint for updating user info
      const response = await fetch(`${backendUrl}/api/update/updateUserInfo`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: userData.id,
          phone_number: newPhoneNumber,
          email: newEmail
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
        setNewPhoneNumber('');
        setNewEmail('');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error updating user information:', error);
      toast.error('Error updating user information');
    }
  };

  return (
    <div>
      <Header />
      <ToastContainer position="top-center" autoClose={5000} />
      <div className="content-container">
        <div className="update-info-box">
          <h2>Update Information</h2>
          <input type="text" placeholder="New Phone Number" value={newPhoneNumber} onChange={e => setNewPhoneNumber(e.target.value)} />
          <input type="email" placeholder="New Email" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
          <button onClick={handleUpdateInfo}>Update Info</button>
        </div>
        <div className="change-password-box">
          <h2>Change Password</h2>
          <input type="password" placeholder="Old Password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
          <input type="password" placeholder="New Password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
          <button onClick={handleChangePassword}>Save Changed </button>
        </div>
        <div className="profile-container">
        <div className="profile-box">
          <Avatar name={userData.username} size="100" round={true} className="profile-avatar" />
          <h2>User Profile</h2>
          <div className="profile-details">
            <p><strong>ID:</strong> {userData.id}</p>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Phone Number:</strong> {userData.phone_number}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            </div>
      </div>
      
    </div>
    </div>
    <Footer />
    </div>
  );
}

export default ProfileUser;
