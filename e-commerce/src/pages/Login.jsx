import React from 'react';
{/* Esto lo saque de Chatgpt, por que no sabia como hacerlo. Igualmente lo entendi, no es dificil  */}
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa'; 

function Login({ setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('token', 'fake_token');
    setIsAuthenticated(true);
    navigate('/'); 
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
