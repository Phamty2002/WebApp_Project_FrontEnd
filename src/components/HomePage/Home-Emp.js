import React from 'react';
import Header from '../Header/Header-Emp';
import TheFooter from '../Footer/Thefooter';
import Sidebar from '../Header/SideBar';

function Home() {
  const containerStyle = {
    backgroundColor: '#FFFFFF', // Set the background color here
  };

  return (
    
    <div style={containerStyle}>
      <Sidebar />
      <Header/>
    </div>
  );
}

export default Home;