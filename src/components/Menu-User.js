import React, { useContext, useState } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import Header from './Header/Header-User';


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

  const handleOrder = (item) => {
    console.log("Ordering", item);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToDisplay = filteredItems.slice(startIndex, endIndex);

  const handleChangePage = (event, page) => {
    if (page === 1) {
      setCurrentPage(1);
    } else if (page <= totalPages) {
      setCurrentPage(page);
    }
  };

  /* const cardStyle = {
    marginLeft: '25px', // Adjust the margin value as needed
  }; */

  const imageStyle = {
    maxWidth: '150%', // Limit the image width to the container's width
    maxHeight: '180px', // Limit the image height
    objectFit: 'cover', // Maintain the aspect ratio and cover the entire container
  };

  /* const searchInputStyle = {
    marginTop: '20px', // Add margin to the top and bottom of the search bar
  }; */

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
                  styles={imageStyle}
                  onError={(e) => {
                    e.target.src = 'path_to_placeholder_image.jpg';
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
      <div>
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