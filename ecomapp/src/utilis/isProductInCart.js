import { useSelector } from 'react-redux';
export const useIsProductInCart = (productId) => {
  return (
    useSelector((state) => state.cart.cart).some((item) => item.id === productId)
  )
};