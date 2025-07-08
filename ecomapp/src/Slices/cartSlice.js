import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
};

const saveCartToLocalStorage = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
            saveCartToLocalStorage(state.cart);
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.id !== action.payload);
            saveCartToLocalStorage(state.cart);
        },
        clearCart: (state) => {
            state.cart = [];
            saveCartToLocalStorage(state.cart);
        },
        increaseQty: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload);
            if (item) item.quantity += 1;
            saveCartToLocalStorage(state.cart);
        },
        decreaseQty: (state, action) => {
            const item = state.cart.find(item => item.id === action.payload);
            if (item && item.quantity > 1) item.quantity -= 1;
            saveCartToLocalStorage(state.cart);
        },
    }
});

export const { addToCart, removeFromCart, clearCart, increaseQty, decreaseQty } = cartSlice.actions;
export default cartSlice.reducer;
