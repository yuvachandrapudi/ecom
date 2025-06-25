import { Routes,Route } from 'react-router-dom';
import './App.css';
import { Home } from './Pages/Home';
import { ProductDetails } from './Pages/Product';


function App() {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:productId" element={<ProductDetails />} />
    </Routes>
  );
}

export default App;
