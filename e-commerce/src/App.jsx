import React,{useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Product from './pages/Product';
import Detalle from './pages/Detalle';
import Login from './pages/Login';
import RequestAuth from './components/RequestAuth';

import './App.css';

function App() {
  
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
          <Route path='/Login' element={<Login setIsAuthenticated={setIsAuthenticated}/>}></Route>
          <Route path='/Producto' element=
            {<RequestAuth isAuthenticated={isAuthenticated}>
              <Product/>
            </RequestAuth>}>
          </Route>
          <Route path='/Detalle/:id' element={<Detalle/>}></Route>
        </Routes>
      </div>
  )
}

export default App;
