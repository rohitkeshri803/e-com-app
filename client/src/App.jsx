import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from './pages/HomePage';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Pagenotfound } from './pages/Pagenotfound';
import { Policy } from './pages/Policy';
import { Register } from "./pages/Auth/Register";
import { ToastContainer } from 'react-toastify';
import { Login } from "./pages/Auth/Login";
import { Dashboard } from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import ForgotPasssword from "./pages/Auth/ForgotPasssword";
import AdminRoute from "./components/Routes/AdminRoute"
import { AdminDashboard } from "./pages/Admin/AdminDashboard";
import CreateCategory from "./pages/Admin/CreateCategory"
import CreateProduct from "./pages/Admin/CreateProduct"
import Users from "./pages/Admin/Users";
import Products from "./pages/Admin/Products";
import AdminOrders from "./pages/Admin/AdminOrders";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import UpdateProducts from "./pages/Admin/UpdateProducts";


function App() {
  return (
    <BrowserRouter>  {/* ✅ Wrap Routes inside BrowserRouter */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* User Dashboard Route (Only Logged-in Users) */}

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders/>}/>
          <Route path="user/profile" element={<Profile/>}/>

        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory/>}/>
          <Route path="admin/create-product" element={<CreateProduct/>}/>
          <Route path="admin/product/:slug" element={<UpdateProducts/>}/>
          <Route path="admin/users" element={<Users/>}/>
          <Route path="admin/products" element={<Products/>}/>
          <Route path="admin/orders" element={<AdminOrders/>}/>
        </Route>





        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPasssword />} />

        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />


        <Route path='*' element={<Pagenotfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
