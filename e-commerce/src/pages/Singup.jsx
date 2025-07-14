import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const API_URL = 'https://686fde294838f58d11233057.mockapi.io/api/users';

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(""); 

    try {
      const res = await fetch(`${API_URL}?username=${username}`);
      const users = await res.json();

      const usuarioNoExiste = users === 'Not found' || (Array.isArray(users) && users.length === 0);

      if (usuarioNoExiste) {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });

        if (response.ok) {
          navigate('/login');
        } else {
          setError('Error al registrar usuario');
        }

      } else {
        setError('El nombre de usuario ya está en uso');
      }
      
    } catch (err) {
      console.error(err);
      setError('Error de red al registrar usuario');
    }
  };
  return (
    <div style={styles.container}>
      <h2>Registrarse</h2>
      <form onSubmit={handleSignup} style={styles.form}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>
          Crear Cuenta
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '30px',
    border: '1px solid #ccc',
    borderRadius: '12px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
};
