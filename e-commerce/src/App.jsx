import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Admin from './pages/Admin';
import Detalle from './pages/Detalle';
import Login from './pages/Login';
import Singup from './pages/Singup';
import Nosotros from "./pages/Nosotros";
import RequestAuth from './components/RequestAuth';
import AdminAuth from './components/AdminAuth';

import './App.css';

function App() {
  {/*Tuve que setear el localStorage en false, por que de manera predeterminada me venia en "True", 
    entonces me permitia ingresar a la ruta "Producto", y no simulaba correctamente el login*/}
  useEffect(() => {
    localStorage.removeItem('token'); 
    setIsAuthenticated(false); 
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token actual:', token);
  }, []);
  return (
      <div>
        <Routes>
          <Route path='/' element={<Home/>}></Route>          
          <Route path='/Singup' element={<Singup setIsAuthenticated={setIsAuthenticated}/>}></Route>
          <Route path='/Login' element={<Login setIsAuthenticated={setIsAuthenticated}/>}></Route>
          {/*Ruta resguardada, el carrito no tiene ruta, ya que es un modal. 
          Igualmente solo te permite ver desde la ruta "Producto", lo configure asi en el Navbar*/}
          <Route path='/Producto' element=
            {<RequestAuth isAuthenticated={isAuthenticated}>
              <Product/>
            </RequestAuth>}>
          </Route>          
          {/* Solo puede ingresar el usuario con id=1. Es decir, el primero el loguearse */}
          <Route path='/Admin' element={
            <AdminAuth>
              <Admin/>
            </AdminAuth>
          }></Route>
        <Route path="/Detalle/:source/:id" element={<Detalle />} />
        <Route path="/nosotros" element={<Nosotros />} />
        </Routes>
      </div>
  )
}

export default App;
