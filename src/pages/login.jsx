import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Inicializar el hook useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/login', {
        email,
        password,
      });

      // Si el login es exitoso
      if (response.status === 200) {
        console.log('Login exitoso:', response.data);

        // Llamar a la función de éxito del login
        onLoginSuccess();
        navigate('/inicio');
      }
    } catch (err) {
      console.error('Error en el login:', err);
      setError('Error en el login. Por favor, revisa tus credenciales.'); // Manejo de errores
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Iniciar sesión</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar error si existe */}
    </div>
  );
};

export default Login;
