import { useSelector } from "react-redux";

export const useIsProductInWishlist = (productId) => {
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  return wishlist.some((item) => item.id === productId);
};
