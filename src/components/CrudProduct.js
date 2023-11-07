import React, { useState, useEffect, useContext } from 'react';
import Header from './Header';
import { ProductsContext } from '../context/ProductsContext';

const backendUrl = process.env.REACT_APP_BACKEND_URL;


function CrudOperations() {
  const { products, setProducts } = useContext(ProductsContext);

  // State for specific product retrieval
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
      fetch(`${backendUrl}/products`) // Correct usage of template literals
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
    console.log('Submitting product:', product); // Log the product object
    fetch(`${backendUrl}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Product created:', data);
      setProducts([...products, data]);
      setProduct({ id: '', name: '', price: '', description: '', image_path: '' }); // Reset the form
    })
    .catch(error => console.error('Error creating product:', error));
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    fetch(`${backendUrl}/products/update/${currentProduct.name}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            price: currentProduct.price,
            description: currentProduct.description,
            image_path: currentProduct.image_path, // Include the image_path in the update
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Product updated:', data);
        // Here you should also update the product list with the new image path
        setProducts(products.map(p => (p.id === currentProduct.id ? { ...p, ...currentProduct } : p)));
        // Reset the current product
        setCurrentProduct({ id: '', name: '', price: '', description: '', image_path: '' });
    })
    .catch(error => console.error('Error updating product:', error));
};

  const handleDelete = (productName) => {
    fetch(`${backendUrl}/products/delete/${productName}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product deleted:', data);
        setProducts(products.filter(product => product.name !== productName));      })
      .catch(error => console.error('Error deleting product:', error));
  };

  const [deleteProductName, setDeleteProductName] = useState('');

  // Function to fetch a specific product by name
  const fetchSpecificProduct = (productName) => {
    // API call to fetch the specific product by name
    fetch(`${backendUrl}/products/${productName}`)
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
      <button type="submit" style={{ marginTop: '10px' }}>Insert Product</button>
          </form>
        );

        
        case 'see':
  return (
    <div>
      <h3>Product List</h3>
      {/* Form for fetching a specific product */}
      <form onSubmit={(e) => {
        e.preventDefault();
        fetchSpecificProduct(specificProductName);
      }}>
        <input
          type="text"
          placeholder="Enter product name to see details"
          value={specificProductName}
          onChange={(e) => setSpecificProductName(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <button type="submit" style={{ marginTop: '10px' }}>Get Specific Product</button>
      </form>

      {/* Display the specific product if it is fetched */}
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
            <button type="submit" style={{ marginTop: '10px' }}>Update Product</button>

          </form>
        );
        case 'delete':
          
            const handleDeleteByName = () => {
              handleDelete(deleteProductName);
              setDeleteProductName(''); // Reset the input after delete
            };
          
            return (
                <div>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={deleteProductName}
                    onChange={(e) => setDeleteProductName(e.target.value)}
                    style={{ marginRight: '10px' }}
                  />
                  <button onClick={handleDeleteByName} style={{ marginTop: '10px', }}>Delete Product</button>
                </div>
              );

              
              default:
      return null; // Handle any unexpected action value
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