import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import { ProductsContext } from '../context/ProductsContext';

function CrudOperations() {
  const { products, setProducts } = useContext(ProductsContext);

  const [specificProductName, setSpecificProductName] = useState('');
  const [specificProduct, setSpecificProduct] = useState(null);
  const [action, setAction] = useState(null);
  const [product, setProduct] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    image_path: ''
  });
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    image_path: ''
  });

  useEffect(() => {
    if (action === 'see') {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`)
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => console.error('Error fetching products:', error));
    }
  }, [action, setProducts]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (action === 'update') {
      setCurrentProduct({ ...currentProduct, [name]: value });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
      setProducts([...products, data]);
      setProduct({ id: '', name: '', price: '', description: '', image_path: '' });
    })
    .catch(error => console.error('Error creating product:', error));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/update/${currentProduct.name}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        price: currentProduct.price,
        description: currentProduct.description,
        image_path: currentProduct.image_path,
      })
    })
    .then(response => response.json())
    .then(data => {
      setProducts(products.map(p => (p.id === currentProduct.id ? { ...p, ...currentProduct } : p)));
      setCurrentProduct({ id: '', name: '', price: '', description: '', image_path: '' });
    })
    .catch(error => console.error('Error updating product:', error));
  };

  const handleDelete = (productName) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/delete/${productName}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      setProducts(products.filter(product => product.name !== productName));
    })
    .catch(error => console.error('Error deleting product:', error));
  };

  const fetchSpecificProduct = (productName) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/products/${productName}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Product not found');
        }
        return response.json();
      })
      .then(data => {
        setSpecificProduct(data);
      })
      .catch(error => {
        console.error('Error fetching specific product:', error);
        setSpecificProduct(null);
      });
  };

  const handleDeleteByName = () => {
    handleDelete(deleteProductName);
    setDeleteProductName('');
  };

  const renderBox = () => {
    switch (action) {
      case 'insert':
        return (
          <form onSubmit={handleSubmit}>
            {/* ... inputs and button for 'insert' action */}
          </form>
        );
      case 'see':
        return (
          <div>
            {/* ... form, product details and list for 'see' action */}
          </div>
        );
      case 'update':
        return (
          <form onSubmit={handleUpdateSubmit}>
            {/* ... inputs and button for 'update' action */}
          </form>
        );
      case 'delete':
        return (
          <div>
            <input
              type="text"
              placeholder="Enter product name"
              value={deleteProductName}
              onChange={(e) => setDeleteProductName(e.target.value)}
            />
            <button onClick={handleDeleteByName}>Delete Product</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <div className="button-group">
          <button onClick={() => setAction('insert')}>Insert Products</button>
          <button onClick={() => setAction('see')}>View Products</button>
          <button onClick={() => setAction('update')}>Update Products</button>
          <button onClick={() => setAction('delete')}>Delete Products</button>
        </div>
        {renderBox()}
      </div>
    </div>
  );
}

export default CrudOperations;
