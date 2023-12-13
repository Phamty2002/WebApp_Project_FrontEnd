// PageProfile.js
import React, { useState } from 'react';
import '../profile/PageProfile.Module.css'; // Assuming your CSS file is named PageProfile.css
import jwt_decode from "jwt-decode";
import Header from '../Header/Header-Emp';
const backendUrl = process.env.REACT_APP_BACKEND_URL;
import TheFooter from '../Footer/Thefooter';
import Sidebar from '../Header/SideBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [phoneNumber, setPhoneNumber] = useState('');


  // State for listing users
  const [userList, setUserList] = useState([]);
  const [listError, setListError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');


  //State for add new users
  const [addUserError, setAddUserError] = useState('');
  const [addUserSuccess, setAddUserSuccess] = useState('');
  //Declare state variables for new user data
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');

  const resetForm = () => {
    setNewUsername('');
    setNewEmail('');
    setNewPassword('');
    setNewRole('');
  };

  const handleAddNewUser = async (newUserData) => {
    setAddUserError('');
    setAddUserSuccess('');
    try {
      const response = await fetch(`${backendUrl}/api/profile/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.e30.EBjxM2QTMEzL3qu-gslV05xyMa1j-YMubrUsvTYm5bg' // Replace with the actual token
        },
        body: JSON.stringify(newUserData)
      });
      const data = await response.json();
      if (response.ok) {
        resetForm();
        // If the user was successfully added, you can clear the form or perform other success actions
        toast.success('New user added successfully.');
      } else {
        // If the server's response was not ok, it means the user wasn't added
        // You can throw an error with the message returned from the server
        throw new Error(data.message || 'Error adding new user');
      }
    } catch (err) {
      // Catch any network errors or errors thrown from the server's response
      toast.error(err.message);
    }
  };

  
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
        toast.success('User displays successfully.');
      } else {
        throw new Error(data.message || 'Error retrieving profile');
      }
    } catch (err) {
      toast.error(err.message);
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
        body: JSON.stringify({ email: email, phone_number: phoneNumber })
      });
  
      if (response.ok) {
        const data = await response.json();
        setUpdateMessage(data.message);
        toast.success('User updated successfully.');
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
      toast.error(err.message);
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
        toast.success('Users list successfully.');
      } else {
        throw new Error(data.message || 'Error listing users');
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const [deleteError, setDeleteError] = useState('');
  const [usernameToDelete, setUsernameToDelete] = useState('');
  const [deleteSuccess, setDeleteSuccess] = useState(''); // State to hold the success message


const handleDeleteUser = async (username) => {
  setDeleteSuccess('');
  setDeleteError('');
  try {
    const response = await fetch(`${backendUrl}/api/profile/${username}`, {
      method: 'DELETE',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.e30.EBjxM2QTMEzL3qu-gslV05xyMa1j-YMubrUsvTYm5bg' // Replace with your actual token
      }
    });

    if (response.ok) {
      setUserList(currentList => currentList.filter(user => user.username!== username));
      setDeleteSuccess(`User "${username}" deleted successfully.`); 
      setUsernameToDelete(''); 
      toast.success('Users deleted successfully.');
      
      // Display a success message or perform other actions as needed
    } else {
      const data = await response.json();
      throw new Error(data.message || 'Error occurred while deleting the user.');
    }
  } catch (err) {
    toast.error(err.message);
  }
};
const onDeleteClick = () => {
  handleDeleteUser(usernameToDelete);
   // Clear the input after deletion
};

  return (
    <>
      <Sidebar/>
      <Header/>
      <ToastContainer />
      <div className="profile-page">
        <div className="card-container">
        <div className="card add-new-user-card">
  <h2>Add User</h2>
  <input
    className="input-field"
    type="text"
    value={newUsername}
    onChange={(e) => setNewUsername(e.target.value)}
    placeholder="Username"
  />
  <input
    className="input-field"
    type="email"
    value={newEmail}
    onChange={(e) => setNewEmail(e.target.value)}
    placeholder="Email"
  />
  <input
    className="input-field"
    type="text" // Change the input type to text for the phone number
    value={newPhoneNumber} // Create a state variable for the phone number
    onChange={(e) => setNewPhoneNumber(e.target.value)} // Update the state variable
    placeholder="Phone Number" // Add a placeholder for the phone number
  />
  <input
    className="input-field"
    type="password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    placeholder="Password"
  />
  <select
    className="input-field"
    value={newRole}
    onChange={(e) => setNewRole(e.target.value)}
  >
    <option value="">Select Role</option>
    <option value="Admin">Admin</option>
    <option value="Customer">Customer</option>
  </select>
  <button
    className="action-button"
    onClick={() =>
      handleAddNewUser({
        username: newUsername,
        email: newEmail,
        password: newPassword,
        role: newRole,
        phone_number: newPhoneNumber, // Pass the phone number to the handleAddNewUser function
      })
    }
  >
    Add User
  </button>
  {addUserSuccess && <p className="success-message">{addUserSuccess}</p>}
  {addUserError && <p className="error-message">{addUserError}</p>}
</div>
        

          <div className="card get-profile-card">
            <h2>View User </h2>
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
            <h2>Update User</h2>
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
            <input
              className="input-field"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter new phone number"
            />
            <button className="action-button" onClick={handleUpdateProfile}>Update Profile</button>
            {updateMessage && <p className="success-message">{updateMessage}</p>}
            {updateError && <p className="error-message">{updateError}</p>}
          </div>

          <div className="card list-users-card">
          <h2>List Users</h2>
            <input
              className="input-field"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by username"
            />
            <button className="action-button" onClick={handleListUsers}>List Users</button>
            <ul>
              {userList
                .filter(user => user.username.toLowerCase().includes(searchQuery.toLowerCase()))
                .map(user => (
                  <li key={user.id}>
                    Username: {user.username}<br />
                    Email: {user.email}<br />
                    Role: {user.role}
                  </li>
              ))}
            </ul>
            {listError && <p className="error-message">{listError}</p>}
          </div>
          <div className="card delete-users-card">
      <h2>Delete User</h2>
      {deleteError && <p className="error-message">{deleteError}</p>}
      {deleteSuccess && <p className="success-message">{deleteSuccess}</p>} {/* Display success message */}
      <input
        type="text"
        placeholder="Enter username"
        value={usernameToDelete}
        onChange={(e) => setUsernameToDelete(e.target.value)}
        className="username-input"
      />
      <button className="action-button" onClick={onDeleteClick}>
        Delete User
      </button>
    </div>
        </div>
      </div>
     
    </>
  );
};

export default PageProfile;