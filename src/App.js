import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from './context/ThemeContext';

import './styles/styles.css'
// Importing existing components
import SignIn from './components/Authentication/Login';
import SignUp from './components/Authentication/Signup';
import HomeEmp from './components/HomePage/Home-Emp';
import HomeUser from './components/HomePage/Home-User';
import HomeDefault from './components/HomePage/Home-Default';
import MenuUser from './components/Menu/Menu-User';
import MenuEmp from './components/Menu/Menu-Emp';
import MenuDefault from './components/Menu/Menu-Default';
import CrudProduct from './components/CRUDproduct/CrudProduct';
import Profile from './components/profile/PageProfile';
import Aboutus from './components/About/About-us';
import AboutusDefault from './components/About/About-us-Default';
import SaveProfile from './components/Save-Profile/Profile-User';
import ContactForm from './components/Contact/contact';
import ContactFormDefault from './components/Contact/contact-default';
import Invoice from './components/Invoice-emp/Invoice-emp';
import ContactEmp from './components/Contact/contact-emp';
import ForgotPassword from './components/Authentication/ForgotPassword';


// Importing order management components
import PlaceOrder from './components/Order/PlaceOrder1';
import PlaceOrderEmp from './components/Order/PlaceOrder-emp';
import GetOrder from './components/Order/GetOrder';
import UpdateOrder from './components/Order/UpdateOrder';
import DeleteOrder from './components/Order/DeleteOrder';
import ManageOrder from './components/Order/ManageOrder-emp';
import GetOrderUser from './components/Order/GetOrder-users';
import { ProductsProvider } from './context/ProductsContext';


//import for payment
import PaymentRefund from './components/Payment/payment-refund';



function AppWrapper() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

function App() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    // Apply the theme class to the body element
    document.body.className = theme === 'dark' ? 'dark-mode' : '';
  }, [theme]);

  return (
    
      <Router>
        <ProductsProvider>
          <Routes>
            <Route path="/" element={<HomeDefault />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/home-emp" element={<HomeEmp />} />
            <Route path="/home-user" element={<HomeUser />} />
            <Route path="/home-default" element={<HomeDefault />} />
            <Route path="/menu-user" element={<MenuUser />} />
            <Route path="/menu-emp" element={<MenuEmp />} />
            <Route path="/menu-default" element={<MenuDefault />} />
            <Route path="/crud" element={<CrudProduct />} />
            <Route path="/about" element={<Aboutus />} />
            <Route path="/about-default" element={<AboutusDefault />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/payment-refund" element={<PaymentRefund />} />
            <Route path="/saveprofile" element={<SaveProfile />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/contact-default" element={<ContactFormDefault />} />
            <Route path="/invoice-emp" element={<Invoice />} />
            <Route path="/contact-emp" element={<ContactEmp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />



            {/* Routes for order management */}
            <Route path="/place-order" element={<PlaceOrder />} />
            <Route path="/place-order-emp" element={<PlaceOrderEmp />} />
            <Route path="/get-order" element={<GetOrder />} />
            <Route path="/get-order-users" element={<GetOrderUser />} />
            <Route path="/update-order" element={<UpdateOrder />} />
            <Route path="/delete-order" element={<DeleteOrder />} />
            <Route path="/orders-emp" element={<ManageOrder />} />
          </Routes>
        </ProductsProvider>
      </Router>
    
  );
}

export default AppWrapper;
