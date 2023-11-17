import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

// Importing existing components
import SignIn from './components/Authentication/Login';
import SignUp from './components/Authentication/Signup';
import HomeEmp from './components/HomePage/Home-Emp';
import HomeUser from './components/HomePage/Home-User';
import MenuUser from './components/Menu/Menu-User';
import MenuEmp from './components/Menu/Menu-Emp';
import CrudProduct from './components/CRUDproduct/CrudProduct';
import Profile from './components/profile/PageProfile';
import Aboutus from './components/About/Aboutus';

// Importing order management components
import PlaceOrder from './components/Order/PlaceOrder1';
import GetOrder from './components/Order/GetOrder';
import UpdateOrder from './components/Order/UpdateOrder';
import DeleteOrder from './components/Order/DeleteOrder';
import ManageOrder from './components/Order/ManageOrder-emp';
import GetOrderUser from './components/Order/GetOrder-users';
import { ProductsProvider } from './context/ProductsContext';

function App() {
  return (
    <UserProvider> 
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

          {/* Routes for order management */}
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/get-order" element={<GetOrder />} />
          <Route path="/get-order-users" element={<GetOrderUser />} />
          <Route path="/update-order" element={<UpdateOrder />} />
          <Route path="/delete-order" element={<DeleteOrder />} />
          <Route path="/orders-emp" element={<ManageOrder />} />
        </Routes>
        </ProductsProvider>
      </Router>
    </UserProvider>
  );
}

export default App;
