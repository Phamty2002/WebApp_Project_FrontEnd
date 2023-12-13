
import React, { useState, useEffect, useContext } from 'react';
import Header from '../Header/Header-Emp';
import { ProductsContext } from '../../context/ProductsContext';
import TheFooter from '../Footer/Thefooter';
import './CrudProduct.css';
import Sidebar from '../Header/SideBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;


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
      fetch(`${backendUrl}/api/products`)
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

  const notifySuccess = (message) => {
    toast.success(message);
  };

  const notifyError = (message) => {
    toast.error(message);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${backendUrl}/api/products`, {
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
      notifySuccess('Product created successfully!');
    })
    .catch(error => {
      console.error('Error creating product:', error);
      notifyError('Error creating product');
    });
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    // Ensure that the currentProduct object contains the necessary data
  
    if (!currentProduct.name) {
      console.error('Product name is required for update.');
      return;
    }
  
    fetch(`${backendUrl}/api/products/update/${currentProduct.name}`, {
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
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      // Assuming the response contains the updated product data
      setProducts(products.map(p => (p.id === currentProduct.id ? { ...p, ...data } : p)));
      setCurrentProduct({ id: '', name: '', price: '', description: '', image_path: '' });
      notifySuccess('Product updated successfully!');
    })
    .catch(error => {
      console.error('Error updating product:', error);
      notifyError('Error updating product');
    });
  };
  

  const handleDelete = (productName) => {
    fetch(`${backendUrl}/api/products/delete/${productName}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
      setProducts(products.filter(product => product.name !== productName));
      notifySuccess('Product deleted successfully!');

    })
    .catch(error => {
      console.error('Error deleting product:', error);
      notifyError('Error deleting product');
    });

  };

  const fetchSpecificProduct = (productName) => {
    fetch(`${backendUrl}/api/products/${productName}`)
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
        console.error('Error deleting product:', error);
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
                  <button
                    onClick={() => fetchSpecificProduct(specificProductName)}
                    style={{ marginTop: '15px', marginBottom: '40px' }}
                  >
                    Get Specific Product
                  </button>
                </div>
                {/* Display the specific product */}
                {specificProduct && (
                  <div className="product-item">
                    <p><strong>ID:</strong> {specificProduct.id}</p>
                    <p><strong>Name:</strong> {specificProduct.name}</p>
                    <p><strong>Price:</strong> {specificProduct.price}</p>
                    <p><strong>Description:</strong> {specificProduct.description}</p>
                    {specificProduct.image_path && (
                      <img 
                        src={specificProduct.image_path} 
                        alt={specificProduct.name} 
                        style={{ width: '50%', height: 'auto', display: 'block', marginBottom: '10px' }} 
                      />
                    )}
                  </div>
                )}
      <div className="product-list">
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <p><strong>ID:</strong> {product.id}</p>
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Price:</strong> {product.price}</p>
            <p><strong>Description:</strong> {product.description}</p>
            {product.image_path && (
              <img src={product.image_path} alt={product.name} style={{ width: '500px', height: '200px', display: 'block', marginBottom: '15px', marginTop: '10px' }} />
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
      <Sidebar />
      <Header/>
      <div className="crudOperations-container">
        <div className="button-group">
          <button onClick={() => setAction("insert")} className="crud-button">
            Insert Products
          </button>
          <button onClick={() => setAction("see")} className="crud-button">
            View Products
          </button>
          <button onClick={() => setAction("update")} className="crud-button">
            Update Products
          </button>
          <button onClick={() => setAction("delete")} className="crud-button">
            Delete Products
          </button>
        </div>
        {renderBox()}
      </div>
      <ToastContainer />
    </div>
    
    
  );
  }  

export default CrudOperations;