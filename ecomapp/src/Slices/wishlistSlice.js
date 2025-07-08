import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    wishlist: localStorage.getItem("wishlist") ? JSON.parse(localStorage.getItem("wishlist")) : [],
}

const saveWishlistToLocalStorage = (wishlist) => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const existingItem = state.wishlist.find(item => item.id === action.payload.id);
            if (!existingItem) {
                state.wishlist.push(action.payload);
            }
            saveWishlistToLocalStorage(state.wishlist);
        },
        removeFromWishlist: (state, action) => {
            state.wishlist = state.wishlist.filter(item => item.id !== action.payload);
            saveWishlistToLocalStorage(state.wishlist);
        },
        clearWishlist: (state) => {
            state.wishlist = [];
            saveWishlistToLocalStorage(state.wishlist);
        },
    }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;