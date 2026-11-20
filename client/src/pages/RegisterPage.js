import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api, { errorMessage } from '../api';
import Alert from '../components/Alert';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

  const handleSub = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/register', formData);
      navigate('/auth', { state: { registered: true } });
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  return (
    <div>
      <h1>Inscription</h1>
      <div className="card form-card">
        <Alert>{error}</Alert>
        <form onSubmit={handleSub}>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input type="text" id="username" value={formData.username} onChange={handleChange} minLength={3} autoComplete="username" required />
          <label htmlFor="password">Mot de passe (8 caractères minimum)</label>
          <input type="password" id="password" value={formData.password} onChange={handleChange} minLength={8} autoComplete="new-password" required />
          <button type="submit">Créer le compte</button>
        </form>
        <p className="muted">Déjà inscrit ? <Link to="/auth">Se connecter</Link></p>
      </div>
    </div>
  );
};

export default RegisterPage;
