import * as React from 'react';
// import { styled } from '@mui/material/styles';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Avatar,
  IconButton,
  Button
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../Slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../../Slices/wishlistSlice';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useIsProductInWishlist } from '../../../utilis/isProductInWishList';
import { useIsProductInCart } from '../../../utilis/isProductInCart';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [imageError, setImageError] = useState(false);

  const imageUrl = product.images && product.images[0];

  const isInCart = useIsProductInCart(product.id);
  const isInWishlist = useIsProductInWishlist(product.id);

  const handleClick = () => {
    // Navigate to the product details page
    navigate(`/product/${product.id}`);
  };

  const onCartClick = (e, productId) => {
    e.stopPropagation();
    if (isInCart) {
      navigate('/cart'); // Navigate to cart if product is already in cart
    } else {
      dispatch(addToCart(product));
    }
  };


  const handleWishlistClick = (e, productId) => {
    e.stopPropagation(); // Prevent the card click event
    if (isInWishlist) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(product));
    }
  };

  return (
    <Card sx={{
      maxWidth: 345, cursor: 'pointer', display: 'flex', flexDirection: 'column',
    }} onClick={handleClick}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#DBA6F7' }} aria-label="product">
            {product.category.name.charAt(0)}
          </Avatar>
        }
        title={<Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          ShopIt
        </Typography>}
      // subheader={`Rs. ${product.price}`}
      />
      <CardMedia>
        {imageUrl && !imageError ? (
          <CardMedia
            component="img"
            height="200"
            image={imageUrl}
            alt={product.title}
            onError={() => setImageError(true)}
          />
        ) : (
          <Box
            height="345px"
            width="345px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#f0f0f0"
          >
            <Typography color="textSecondary">Image not available</Typography>
          </Box>
        )}
      </CardMedia>

      <CardContent >
        <Typography sx={{height:96}} variant="h5" component="div" >
          {product.title}
        </Typography>
        <Typography sx={{ mt: 1 }}>
          <span style={{ fontWeight: 'bold' }}>Price:</span> Rs. {product.price}{' '}
          <span style={{ textDecoration: 'line-through', marginLeft: '8px', color: 'gray' }}>
            Rs. 2499
          </span>{' '}
          <span style={{ color: 'green', marginLeft: '8px' }}>
            {product.discount || 30}% OFF
          </span>
        </Typography>
      </CardContent>
      <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between', px: 2, py: 1, mt: 'auto', }}>
        <Button
          variant="contained"
          size="small"
          startIcon={isInCart ? <ShoppingCartCheckoutIcon /> : <ShoppingCartIcon />}
          onClick={(e) => onCartClick(e, product.id)}
        >
          {isInCart ? 'Go to Cart' : 'Add to Cart'}
        </Button>
        <IconButton
          aria-label="add to wishlist"
          onClick={(e) => handleWishlistClick(e, product.id)}
        >
          <FavoriteIcon color={isInWishlist ? 'error' : 'inherit'} />
        </IconButton>

      </CardActions>
    </Card>
  );
};
