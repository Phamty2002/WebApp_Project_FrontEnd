import React, { useContext, useState } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import { OrderCartContext } from '../../context/OrderCartContext';
import Header from '../Header/Header-User';

import {
  Card,
  CardContent,
  Button,
  TextField,
  CardActions,
  Typography,
  Grid,
} from '@mui/material';
import Pagination from '@mui/material/Pagination';

function Menu() {
  const { products } = useContext(ProductsContext);
  const { addToOrder, finalizeOrder } = useContext(OrderCartContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Dummy user ID and address - replace with actual data from your application's state or user session
  const userId = 15; // Example user ID
  const addressShipping = '123 Main Street'; // Example shipping address

  const filteredItems = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleOrder = (item) => {
    addToOrder(item);
    console.log("Added to order:", item);
  };

  const handleFinalizeOrder = () => {
    finalizeOrder(userId, addressShipping);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = filteredItems.slice(startIndex, endIndex);

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const imageStyle = {
    maxWidth: '150%',
    maxHeight: '180px',
    objectFit: 'cover',
  };

  return (
    <div>
      <Header />
      <TextField
        label="Search Food"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <Grid container className="menu-items">
        {itemsToDisplay.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="menu-item-card">
              <CardContent>
                <img
                  src={item.image_path || item.image}
                  alt={item.name}
                  className="menu-item-image"
                  style={imageStyle}
                  onError={(e) => {
                    e.target.src = 'path_to_placeholder_image.jpg'; // Replace with actual placeholder image path
                  }}
                  loading="lazy"
                />
                <Typography variant="h6" className="menu-item-name">
                  {item.name}
                </Typography>
                <Typography className="menu-item-description">
                  {item.description}
                </Typography>
                <Typography className="menu-item-price">
                  Price: ${item.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  className="order-button"
                  onClick={() => handleOrder(item)}
                >
                  Order
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
        />
      </div>
      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleFinalizeOrder}
        >
          Finalize Order
        </Button>
      </div>
    </div>
  );
}

export default Menu;
