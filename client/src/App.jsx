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
function App() {
  return (
    <BrowserRouter>  {/* ✅ Wrap Routes inside BrowserRouter */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/dashboard' element={<PrivateRoute/> } >
        <Route path='user' element={<Dashboard />} />
        </Route>

        <Route path='/dashbo' element={<AdminRoute/>} />



        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/forgot-password' element={<ForgotPasssword/>} />
               
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />

        
        <Route path='*' element={<Pagenotfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
