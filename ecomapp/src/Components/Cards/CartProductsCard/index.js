import * as React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Button, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeFromCart,increaseQty,decreaseQty } from '../../../Slices/cartSlice';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const CartProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };

  const onCartClick = (e, productId) => {
    e.stopPropagation();
    dispatch(removeFromCart(productId));
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        display: 'flex',
        flexDirection: 'col',
        boxShadow: 3,
        cursor: 'pointer',
        mb: 2,
        maxWidth: 700
      }}
    >
      {/* Left - Image */}
      <Box sx={{ position: 'relative', width: '40%' }}>
        <CardMedia
          component="img"
          sx={{ height: '100%', objectFit: 'cover' }}
          image={product.images[0]}
          alt={product.title}
        />
        <Typography
          variant="caption"
          sx={{
            position: 'absolute',
            top: 8,
            left: 8,
            backgroundColor: '#3f51b5',
            color: 'white',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            fontSize: '0.75rem'
          }}
        >
          Trending
        </Typography>
      </Box>

      {/* Right - Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, p: 2 }}>
        <Typography variant="h6" gutterBottom>
          {product.title || 'Premium Collection'}
        </Typography>

        <Box sx={{ mt: 1 }}>
          <Typography sx={{ fontWeight: 'bold' }}>
            Rs. {product.price}
            <span style={{ textDecoration: 'line-through', marginLeft: 8, color: 'gray', fontWeight: 'normal' }}>
              Rs. 2499
            </span>
            <span style={{ color: 'green', marginLeft: 8 }}>
              {product.discount || 30}% OFF
            </span>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 1 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(decreaseQty(product.id));
            }}
          >
            <RemoveIcon fontSize="small" />
          </Button>
          <Typography>{product.quantity}</Typography>
          <Button
            variant="outlined"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(increaseQty(product.id));
            }}
          >
            <AddIcon fontSize="small" />
          </Button>
        </Box>

        <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            variant="contained"
            size="small"
            startIcon={<RemoveShoppingCartIcon />}
            onClick={(e) => onCartClick(e, product.id)}
          >
            Remove from Cart
          </Button>
          <IconButton aria-label="add to wishlist" onClick={(e) => e.stopPropagation()}>
            <FavoriteIcon />
          </IconButton>
        </Box>
      </Box>
    </Card>
  );
};
