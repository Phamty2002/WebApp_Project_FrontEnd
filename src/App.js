import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './components/Authentication/Login';
import SignUp from './components/Authentication/Signup';
import HomeEmp from './components/HomePage/Home-Emp';
import HomeUser from './components/HomePage/Home-User';
import MenuUser from './components/Menu/Menu-User';
import MenuEmp from './components/Menu/Menu-Emp';
import CrudProduct from './components/CrudProduct';
import Profile from './components/profile/PageProfile';
import Aboutus from './components/About/AboutUs';
import { ProductsProvider } from './context/ProductsContext';
function App() {
  return (
    <Router>
      <ProductsProvider>
        
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/home-emp" element={<HomeEmp />} />
            <Route path="/home-user" element={<HomeUser />} />
            <Route path="/menu-user" element={<MenuUser />} />
            <Route path="/menu-emp" element={<MenuEmp />} />
            <Route path="/crud" element={<CrudProduct />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
       
      </ProductsProvider>
    </Router>
  );
}

export default App;
