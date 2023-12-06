import React, { useContext, useState } from 'react';
import { ProductsContext } from '../../context/ProductsContext';
import Header from '../Header/Header-Emp';
import PlaceOrder from '../Order/PlaceOrder1';
import TheFooter from '../Footer/Thefooter';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;


  const filteredItems = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);


  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = filteredItems.slice(startIndex, endIndex);

  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const imageStyle = {
    width: '100%', 
    height: '180px', 
    objectFit: 'cover', 
    objectPosition: 'center',
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
        <Typography variant="subtitle1" className="menu-item-id">
          ID: {item.id}
        </Typography>
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
      
      
    </div>
  );
}

export default Menu;
