
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home.jsx';
import ProductsPage from './pages/Products.jsx';
import ProductDetailsPage from './pages/ProductDetails';
import AddProductPage from './pages/addproduct.jsx';
import EditProductPage from './pages/editproduct.jsx';
import AdminSignupPage from './pages/admin_signup.jsx';
import AdminLogin from './pages/admin_login.jsx';
import VerifyAdmin from './pages/verify_admin.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/products" Component={ProductsPage} />
        <Route path="/products/:id" Component={ProductDetailsPage} />
        <Route path="/addproduct" Component={AddProductPage} />
        <Route path="/products/:id/edit" Component={EditProductPage} />
        <Route path="/admin/signup" Component={AdminSignupPage} />
        <Route path="/admin/login" Component={AdminLogin} />
        <Route path="/admin/verify-email" Component={VerifyAdmin} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
