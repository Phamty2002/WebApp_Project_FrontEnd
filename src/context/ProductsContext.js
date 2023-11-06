// ProductsContext.js
import React, { createContext, useState, useEffect } from 'react'; // Add useEffect here
// Create a context for the products
export const ProductsContext = createContext();

// A component that provides the products state to its children
export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Fetch products when the component mounts
  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const contextValue = {
    products,
    setProducts,
  };

  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};
