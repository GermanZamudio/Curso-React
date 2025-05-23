import React,{useContext,useState} from 'react';
import { Link , useLocation} from 'react-router-dom';
import logo from '../assets/logo.png';
import canasto from '../assets/canasto.png';
import styled, { keyframes } from 'styled-components'; 
import { CarritoContext } from "../context/CarritoContext.jsx";
import { FiLogOut } from "react-icons/fi";
import { FiLogIn } from 'react-icons/fi'; 
const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: ${props => props.modoOscuro ? ' #ffffff' : '#e6f7fb'}; 
  padding: 10px;
  border-radius: 9999px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  margin-left: 2rem;
  transition: all 0.3s ease-in-out;
  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
  }
  &:hover {
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.18);
    transform: translateY(-2px);
  }
`
const NavContainer=styled.nav `    
    width: 100%;
    font-family: 'Inter', sans-serif; 
    padding-top:1rem;
    padding-bottom:1rem;
    display:flex;
    background-color: ${props => props.modoOscuro ? '#121212' : '#ffffff'}; 
    border-bottom: ${props => props.modoOscuro ? 'solid #727272 2px' : 'solid #F4EFE6 2px'};
    transition: background-color 1s ease;
    transition: background-color 1s ease;
    justify-content: space-between;
    align-items:center;
    margin: 0;
    .ContainerLinks{
      width: 40%;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
    .Carrito {
      margin-right: 5%;
      cursor: pointer;
      a {
        display: inline-block;
        img {
          width: 50px;
          height: 50px;
          transition: transform 1s ease;
        }
        &:hover img {
          animation: ${shake} 0.7s linear;
        }
      }}
    a{
        color: #000000;
        text-align: center;
        text-decoration: none;
        margin-right:1rem;
        font-size:19px;
        transition: 0.5s;
    }
    a:hover{
    color: #577176;
    font-size:1.21rem;
    }

    `

function Navbar({openCarr}) {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/"; 
  };
  const location = useLocation();
  const { carrito} = useContext(CarritoContext);
  return (
    <NavContainer>
      <LogoContainer>
        <img src={logo} alt="Logo" />
      </LogoContainer>
      <div className='ContainerLinks'>
        <Link to="/">Home</Link>
        <Link to="/Producto">Productos</Link>
        <Link to="/">Nosotros</Link>
        <Link to="/">Contacto</Link>
        {localStorage.getItem('token')?(
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <FiLogOut size={24} title="Cerrar sesión" />
          </button>
        )
          :
        (        
          <Link to="/Login">
            <FiLogIn size={24} title="Iniciar Sesion"/>
          </Link>
          )}
      </div>
      <div className='Carrito'>
         {location.pathname === "/Producto" && (
        <a onClick={openCarr}><img src={canasto} alt="" />{carrito.length}</a>
          )}
      </div>
    </NavContainer>
  );
}


export default Navbar;