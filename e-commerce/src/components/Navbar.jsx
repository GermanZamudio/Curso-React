import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import canasto from '../assets/canasto.png';
import styled, { keyframes } from 'styled-components';
import { CarritoContext } from '../context/CarritoContext.jsx';

const shake = keyframes`
  0% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  50% { transform: translateX(4px); }
  75% { transform: translateX(-4px); }
  100% { transform: translateX(0); }
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
  height: 120px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1100;

  .ContainerLinks {
    display: flex;
    align-items: center;
    gap: 1.5rem;

    a,
    button {
      font-family: 'Playfair Display', serif;
      font-size: 1.3rem;
      font-weight: 400;
      color: #1a1a1a;
      text-decoration: none;
      cursor: pointer;
      background: none;
      border: none;
      display: flex;
      align-items: center;
      gap: 0.3rem;
      position: relative;
      padding-bottom: 0.3rem;
      letter-spacing: 0.05em;
      transition: color 0.3s ease, transform 0.3s ease;

      &::after {
        content: '';
        display: block;
        width: 60%;
        height: 2.5px;
        background: linear-gradient(90deg, #1979d8, #56ccf2);
        border-radius: 2px;
        position: absolute;
        bottom: 0;
        left: 20%;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      &:hover {
        color: #1979d8;
        transform: scale(1.05);

        &::after {
          opacity: 1;
        }
      }
    }

    .account-dropdown {
      position: relative;

      .dropdown-content {
        display: none;
        position: absolute;
        top: 30px;
        right: 0;
        background-color: white;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        border-radius: 6px;
        padding: 10px;
        min-width: 120px;
        z-index: 10;
        flex-direction: column;

        a, button {
          padding: 5px 10px;
          text-align: left;
          width: 100%;
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          font-size: 1rem;
          color: #1a1a1a;
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }

        a:hover, button:hover {
          background-color: #f2f2f2;
        }
      }

      &:hover .dropdown-content {
        display: flex;
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

  .menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    position: fixed;
    top: 1rem;
    right: 1rem;
    z-index: 1050;
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
      z-index: 1000;
    }

    .ContainerLinks.open {
      transform: translateX(0);
    }

    .Carrito {
      margin-right: 0;
    }

    .menu-toggle {
      display: block;
    }
  }
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

const MainContent = styled.main`
  padding-top: 100px; /* Ajusta este valor al alto total del navbar */
`;

function Navbar({ openCarr }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { carrito } = useContext(CarritoContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoggedIn = !!localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
    window.location.href = '/';
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
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
          {menuOpen ? 'X' : '☰'}
        </button>

        <div className={`ContainerLinks ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={closeMenu}>Home</Link>

          {isLoggedIn && isAdmin && (
            <Link to="/Admin" onClick={closeMenu}>Gestionar Productos</Link>
          )}

          <Link to="/Producto" onClick={closeMenu}>Productos</Link>
          <Link to="/nosotros" onClick={closeMenu}>Nosotros y Contacto</Link>

          {!isLoggedIn && (
            <Link to="/Singup" onClick={closeMenu}>Registrate</Link>
          )}

          <div className="account-dropdown">
            <button>Mi cuenta</button>
            <div className="dropdown-content">
              {isLoggedIn ? (
                <button onClick={handleLogout}>Cerrar sesión</button>
              ) : (
                <Link to="/Login" onClick={closeMenu}>Ingresar</Link>
              )}
            </div>
          </div>
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

      <MainContent>
        {/* Aquí va el contenido principal de la página */}
      </MainContent>
    </>
  );
}

export default Navbar;
