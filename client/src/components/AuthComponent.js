import React, { useState } from 'react';
import axios from 'axios';

const AuthComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', { username, password });
      window.location.href = '/';
      console.log('Token d\'authentification reçu:', response.data.token);
    } catch (error) {
      console.error('Erreur lors de l\'authentification:', error);
      setError('Nom d\'utilisateur ou mot de passe incorrect');
    }
  };

  return (
    <div className="login-container">
      
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleLogin} className="login-form">
        <div>
          <label htmlFor="username">Nom d'utilisateur:</label>
          <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="login-button">Se connecter</button>
      </form>
    </div>
  );
};

export default AuthComponent;
