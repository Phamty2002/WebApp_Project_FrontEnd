import React from 'react';
import Slider from '../Slider';
import Header from '../Header/Header-Default';
import TheFooter from '../Footer/Thefooter';
import Sections from '../Sections/Sections';

function Home() {
  const containerStyle = {
    backgroundColor: '#FFFFFF', // Set the background color here
  };

  return (
    <div style={containerStyle}>
      <Header />
      <Sections />
      <TheFooter />
    </div>
  );
}

export default Home;
