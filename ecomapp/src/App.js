import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './Pages/Home';
import { ProductDetails } from "./Pages/Product"; 
import { Provider } from 'react-redux';
import { store } from './store/store';
import { Wishlist } from './Pages/Wishlist';
import { Cart } from './Pages/Cart';
import { Login } from './Pages/Login';
import { Register } from './Pages/Register';
import { ProtectedRoute } from './Components/ProtectedRoute';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={
            <Home />
        } />
        <Route path="/product/:id" element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        } />
        <Route path="/cart" element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        } />
        <Route path="/wishlist" element={
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add more routes as needed */}
      </Routes>
    </Provider>
  );
}

export default App;
