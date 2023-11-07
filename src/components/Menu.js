import React, { useContext, useState } from 'react';
import { ProductsContext } from '../context/ProductsContext';
import Header from './Header';
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

  // Helper function to get the image URL
  const getImageUrl = (imagePath) => {
    // Check if imagePath is a full URL
    if (/^https?:\/\//i.test(imagePath)) {
      return imagePath;
    } else {
      // If imagePath is a relative path, prepend the backend URL
      return `${process.env.REACT_APP_BACKEND_URL}/images/${imagePath}`;
    }
  };
  

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
      <Grid container spacing={2} className="menu-items">
        {itemsToDisplay.map((item) => (
          <Grid item key={item.id} xs={12} sm={6} md={4} lg={3}>
            <Card className="menu-item-card">
              <CardContent>
                <img
                  src={getImageUrl(item.image_path)}
                  alt={item.name}
                  style={imageStyle}
                  loading="lazy"
                />
                <Typography variant="h6" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="body1">
                  Price: ${item.price}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleOrder(item)}>
                  Order
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handleChangePage}
        className="pagination"
      />
    </div>
  );
}

export default Menu;
