import React from 'react';
import AvatarButton from './AvatarButton';
import Slider from './Slider';
import Header from './Header';
import Contact from './contact';

function Home() {
  const containerStyle = {
    backgroundColor: '#DDCCE7', // Set the background color here
  };

  return (
    <div style={containerStyle}>
      <Header />
      <Slider />
      <Contact />
    </div>
  );
}

export default Home;
