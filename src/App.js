import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/Authentication/Login';
import SignUp from './components/Authentication/Signup';
import HomeEmp from './components/HomePage/Home-Emp';
import HomeUser from './components/HomePage/Home-User';
import MenuUser from './components/Menu/Menu-User';
import MenuEmp from './components/Menu/Menu-Emp';
import CrudProduct from './components/CrudProduct';
import { ProductsProvider } from './context/ProductsContext';
import { OrderCartContextProvider } from './context/OrderCartContext'; // Corrected import
import Profile from './components/profile/PageProfile';
import OrderPage from './components/OrderPage/OrderPage';

function App() {
  return (
    <Router>
      <ProductsProvider>
        <OrderCartContextProvider> {/* Corrected Provider */}
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/home-emp" element={<HomeEmp />} />
            <Route path="/home-user" element={<HomeUser />} />
            <Route path="/menu-user" element={<MenuUser />} />
            <Route path="/menu-emp" element={<MenuEmp />} />
            <Route path="/crud" element={<CrudProduct />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/order" element={<OrderPage />} />
          </Routes>
        </OrderCartContextProvider>
      </ProductsProvider>
    </Router>
  );
}

export default App;
