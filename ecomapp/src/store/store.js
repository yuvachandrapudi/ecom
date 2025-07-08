import {configureStore} from '@reduxjs/toolkit';
import productsReducer from '../Slices/productsSlice';
import cartReducer from '../Slices/cartSlice';
import wishlistReducer from '../Slices/wishlistSlice';
import  loginReducer from '../Slices/loginSlice';
import registerReducer from '../Slices/registerSlice';
import loadingReducer from '../Slices/loadingSlice';

export const store = configureStore({
    reducer :{
        products : productsReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,
        login:loginReducer,
        register:registerReducer,
        loading: loadingReducer
    }
})