import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from './pages/HomePage';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Pagenotfound } from './pages/Pagenotfound';
import { Policy } from './pages/Policy';
import { Register } from "./pages/Auth/Register";
import { ToastContainer } from 'react-toastify';
import { Login } from "./pages/Auth/Login";

function App() {
  return (
    <BrowserRouter>  {/* ✅ Wrap Routes inside BrowserRouter */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />

        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        
        <Route path='*' element={<Pagenotfound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
