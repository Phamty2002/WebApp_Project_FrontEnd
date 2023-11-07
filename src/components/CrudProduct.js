import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import { ProductsContext } from '../context/ProductsContext';

function CrudOperations() {
  const { products, setProducts } = useContext(ProductsContext);

  const [specificProductName, setSpecificProductName] = useState('');
  const [specificProduct, setSpecificProduct] = useState(null);
  const [action, setAction] = useState('');
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
  const [deleteProductName, setDeleteProductName] = useState('');

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
      setProduct({ id: '', name: '', price: '', description: '', image_path: '' }); // Reset form
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
      setCurrentProduct({ id: '', name: '', price: '', description: '', image_path: '' }); // Reset form
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

  const renderBox = () => {
    switch (action) {
      case 'insert':
        return (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={product.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={product.price}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={product.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="image_path"
              placeholder="Image Path"
              value={product.image_path}
              onChange={handleInputChange}
            />
            <button type="submit">Insert Product</button>
          </form>
        );
        case 'see':
  return (
    <div>
      <h3>Product List</h3>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter product name to view"
          value={specificProductName}
          onChange={(e) => setSpecificProductName(e.target.value)}
        />
        <button onClick={() => fetchSpecificProduct(specificProductName)}>Get Specific Product</button>
      </div>
      {/* Display the specific product */}
      {specificProduct && (
       <div style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
       <p><strong>ID:</strong> {specificProduct.id}</p>
       <p><strong>Name:</strong> {specificProduct.name}</p>
       <p><strong>Price:</strong> {specificProduct.price}</p>
       <p><strong>Description:</strong> {specificProduct.description}</p>
       {specificProduct.image_path && (
          <img src={specificProduct.image_path} alt={specificProduct.name} style={{ width: '100%', height: 'auto', display: 'block', marginBottom: '10px' }} />
       )}
          </div>
      )}
      {/* List all products */}
      {products.map((product, index) => (
        <div key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
        <p><strong>ID:</strong> {product.id}</p>
        <p><strong>Name:</strong> {product.name}</p>
        <p><strong>Price:</strong> {product.price}</p>
        <p><strong>Description:</strong> {product.description}</p>
        {product.image_path && (
          <img src={product.image_path} alt={product.name} style={{ width: '500px', height: '300px', display: 'block', marginBottom: '15px', marginTop: '10px' }} />
        )}
        <div style={{ marginTop: '10px' }}>
          <button onClick={() => {
            setCurrentProduct(product);
            setAction('update');
          }} style={{ marginRight: '10px' }}>Update</button>
          <button onClick={() => handleDelete(product.name)}>Delete</button>
        </div>
        </div>
      ))}
    </div>
  );

        
      case 'update':
        return (
          <form onSubmit={handleUpdateSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={currentProduct.name}
              onChange={handleInputChange}
              disabled
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={currentProduct.price}
              onChange={handleInputChange}
            />
            <textarea
              name="description"
              placeholder="Description"
              value={currentProduct.description}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="image_path"
              placeholder="Image Path"
              value={currentProduct.image_path}
              onChange={handleInputChange}
            />
            <button type="submit">Update Product</button>
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
            <button onClick={() => handleDelete(deleteProductName)}>Delete Product</button>
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
        <div className="button-group" style={{ display: "flex", gap: "15px" }}>
          <button
            onClick={() => setAction("insert")}
            style={{ padding: "15px" }}
          >
            Insert Products
          </button>
          <button onClick={() => setAction("see")} style={{ padding: "15px" }}>
            View Products
          </button>
          <button
            onClick={() => setAction("update")}
            style={{ padding: "15px" }}
          >
            Update Products
          </button>
          <button
            onClick={() => setAction("delete")}
            style={{ padding: "15px" }}
          >
            Delete Products
          </button>
        </div>
        {renderBox()}
      </div>
    </div>
  );
  }  

export default CrudOperations;
