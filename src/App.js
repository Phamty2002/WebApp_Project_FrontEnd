import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignIn from './components/Login';
import SignUp from './components/Signup';
import Home from './components/Home';
import Menu from './components/Menu';
import CrudProduct from './components/CrudProduct';
import { ProductsProvider } from './context/ProductsContext';

function App() {
  return (
    <Router>
      <ProductsProvider> {/* Wrap all routes with ProductsProvider */}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/crud" element={<CrudProduct />} />
        </Routes>
      </ProductsProvider>
    </Router>
  );
}

export default App;
