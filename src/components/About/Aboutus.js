// src/components/AboutUs.js
import React from 'react';
import Pizza from '../../images/pizza.jpg';
import Mi from  '../../images/mì.jpg';
import Hamburger from '../../images/hamburger.jpg';
import nhanvien from '../../images/nhanvien.jpg';

const AboutUs = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }} >
        <div style={{ textAlign: 'center', width: '670', height:'1000', padding: '20px' }}> 
        <div style={{textAlign:'center'}}> <h2>Welcome to Rose Petal Bistro!</h2> </div>
        <div style={{textAlign:'left', padding:'20px'}}>
            <p>We enjoy sharing our passion for food through creating a wonderful online space where people can discover, experience and shop for the best food.</p>
            <p>With the desire to bring everyone the best culinary experience, we are proud to introduce to you quality products, from traditional dishes to new creations, from familiar flavors to unique flavors. delicate blend.</p>
            <p>We are committed to providing quality products, carefully selected from the most reliable sources, helping you confidently choose and enjoy your favorite dishes anytime, anywhere.</p>
            <p>At Rose Petal Bistro, we not only sell food but also share our passion and create a food-loving community. We hope you will feel sublime with every shopping experience here and join us in sharing our passion with everyone around you.</p>
            <div style={{textAlign:'left', padding:'40px'}}>
             <img src={Pizza} alt="" width={670} height={250}  />
             <img src={Mi} alt="" width={670} height={250} />
             <img src={Hamburger} alt="" width={670} height={250} /></div>
        </div>    
        </div>
        <div style={{ textAlign: 'right', width: '50%', padding: '40px' }}>
          <img src={nhanvien} alt='' width={630} height={320} />
          <div style={{ textAlign:'center'}} >
          <h2>Join us to start the journey to discover the exquisite flavors and creativity in each dish</h2>
          <div style={{ textAlign:'left' ,padding:'30px'}}>
        <h3>1. Pizza - Artistry From the Oven</h3>
        <p>
        At Rose Petal Bistro, we treat Italian pizza as a work of art. The pizzas are baked from a tropical oven, resulting in a thin, crispy crust and rich fillings. We use the freshest ingredients, from delicious cheeses to vegetables and meats, to create the best Italian pizzas.
        </p>
          </div>
      <div style={{ textAlign:'left',padding:'30px'}} >
        <h3>2. Pasta with Cream Sauce - Delicate Flavor From Creamy Goodness</h3>
        <p>Tender pasta strands, coated in a luscious cream sauce, create delightful Pasta with Cream Sauce dishes at [Restaurant Name]. We always select the finest pasta and pair it with unique creamy sauces to produce flavorful and hearty pasta meals.</p>
      </div>
      <div style={{ textAlign:'left',padding:'30px'}}>
        <h3>3. Hamburgers - The Perfect Fusion of Meat and Burger Bun</h3>
        <p>
        Our hamburgers are more than just a simple meal at [Restaurant Name]. We leverage creativity to craft the most mouthwatering burgers. Fresh, well-cooked meat is combined with crisp vegetables and special sauces, resulting in irresistibly delicious and satisfying hamburgers.
        </p>
      </div>
      <div style={{ textAlign:'center',padding:'30px'}}>
        <p>
        Thank you for choosing Rose Petal Bistro. We are honored to serve you!
        </p>
      </div>
    </div>
  </div>
</div>   
  );
};

export default AboutUs;