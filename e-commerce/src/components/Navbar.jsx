import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';
import canasto from '../assets/canasto.png';
import styled, { keyframes } from 'styled-components';
import { CarritoContext } from '../context/CarritoContext.jsx';
import { FiLogOut, FiLogIn, FiMenu, FiX } from 'react-icons/fi';

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
  background-color: #e6f7fb;
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
`;

const NavContainer = styled.nav`
  width: 100%;
  font-family: 'Inter', sans-serif;
  padding: 1rem 2rem;
  background-color: #ffffff;
  border-bottom: solid #f4efe6 2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  .ContainerLinks {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    a,
    button {
      color: #000000;
      font-size: 1.1rem;
      text-decoration: none;
      cursor: pointer;
      background: none;
      border: none;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      transition: color 0.3s ease, transform 0.3s ease;

      &:hover {
        color: #577176;
        transform: scale(1.1);
      }
    }
  }

  .Carrito {
    margin-right: 2rem;
    cursor: pointer;

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.3rem;
      font-weight: 600;
      color: #000;
      text-decoration: none;

      img {
        width: 40px;
        height: 40px;
        transition: transform 1s ease;
      }
      &:hover img {
        animation: ${shake} 0.7s linear;
      }
    }
  }

  /* MOBILE MENU BUTTON */
  .menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    position: fixed; /* <- fijo para que esté visible */
    top: 1rem;       /* margen superior */
    right: 1rem;     /* margen derecho */
    z-index: 1050;   /* encima del menú */
    svg {
      width: 28px;
      height: 28px;
      color: #000;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;

    .ContainerLinks {
      position: fixed;
      top: 0;
      right: 0;
      background: #fff;
      height: 100vh;
      width: 220px;
      flex-direction: column;
      justify-content: flex-start;
      padding-top: 4rem;
      transform: translateX(100%);
      transition: transform 0.3s ease-in-out;
      box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
      z-index: 1000; /* menor que el botón */
    }

    .ContainerLinks.open {
      transform: translateX(0);
    }

    .Carrito {
      margin-right: 0;
      a {
        font-size: 1.1rem;
      }
    }

    .menu-toggle {
      display: block;
    }
  }
`;

function Navbar({ openCarr }) {
  const location = useLocation();
  const { carrito } = useContext(CarritoContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu on link click (mobile)
  const closeMenu = () => setMenuOpen(false);

  return (
    <NavContainer>
      <LogoContainer>
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Logo" />
        </Link>
      </LogoContainer>

      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      <div className={`ContainerLinks ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>
        <Link to="/Admin" onClick={closeMenu}>
          Admin
        </Link>
        <Link to="/Producto" onClick={closeMenu}>
          Productos
        </Link>
        <Link to="/nosotros" onClick={closeMenu}>
          Nosotros y Contacto
        </Link>

        {localStorage.getItem('token') ? (
          <button
            onClick={() => {
              handleLogout();
              closeMenu();
            }}
            title="Cerrar sesión"
          >
            <FiLogOut /> Logout
          </button>
        ) : (
          <Link to="/Login" onClick={closeMenu}>
            <FiLogIn /> Login
          </Link>
        )}
      </div>

      <div className="Carrito">
        {location.pathname === '/Producto' && (
          <a onClick={openCarr} style={{ cursor: 'pointer' }}>
            <img src={canasto} alt="Carrito" />
            {carrito.length}
          </a>
        )}
      </div>
    </NavContainer>
  );
}

export default Navbar;
