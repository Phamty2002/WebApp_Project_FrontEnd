import React from 'react';
import Slider from '../Slider';
import Header from '../Header/Header-Emp';
import Contact from '../contact';
import TheFooter from '../Footer/Thefooter';
import Sections from '../Sections/Sections';
import Sidebar from '../Header/SideBar';

function Home() {
  const containerStyle = {
    backgroundColor: '#FFFFFF', // Set the background color here
  };

  return (
    <div style={containerStyle}>
      <Sidebar />
    </div>
  );
}

export default Home;
