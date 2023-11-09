import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/Login';
import SignUp from './components/Signup';
import HomeEmp from './components/Home-Emp';
import HomeUser from './components/Home-User';
import MenuUser from './components/Menu-User';
import MenuEmp from './components/Menu-Emp';
import CrudProduct from './components/CrudProduct';
import { ProductsProvider } from './context/ProductsContext';
import Profile from './components/profile/PageProfile';

function App() {
  return (
    <Router>
      <ProductsProvider> {/* Wrap all routes with ProductsProvider */}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home-emp" element={<HomeEmp />} />
          <Route path="/home-user" element={<HomeUser />} />
          <Route path="/menu-user" element={<MenuUser />} />
          <Route path="/menu-emp" element={<MenuEmp />} />
          <Route path="/crud" element={<CrudProduct />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </ProductsProvider>
    </Router>
  );
}

export default App;
