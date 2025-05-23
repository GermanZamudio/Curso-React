import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa'; // FontAwesome

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('token', 'fake_token');
    setIsAuthenticated(true);
    navigate('/'); // redirigir al home después del login
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Iniciar sesión</h2>
      <button onClick={handleLogin} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
        <FaSignInAlt size={24} title="Iniciar Sesion"/>
      </button>
    </div>
  );
}

export default Login;
