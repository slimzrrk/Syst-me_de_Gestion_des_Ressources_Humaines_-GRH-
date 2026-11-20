import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api, { errorMessage } from '../api';
import { saveSession } from '../auth';
import Alert from './Alert';

const AuthComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/login', { username, password });
      saveSession(data.token, data.user.username);
      navigate((location.state && location.state.from) || '/', { replace: true });
    } catch (err) {
      setError(errorMessage(err));
      setLoading(false);
    }
  };

  return (
    <div className="card form-card">
      <Alert type="success">{location.state && location.state.registered && 'Compte créé : vous pouvez vous connecter.'}</Alert>
      <Alert>{error}</Alert>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Nom d'utilisateur</label>
        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required />
        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required />
        <button type="submit" disabled={loading}>{loading ? 'Connexion…' : 'Se connecter'}</button>
      </form>
      <p className="muted">Pas encore de compte ? <Link to="/register">Créer un compte</Link></p>
    </div>
  );
};

export default AuthComponent;
