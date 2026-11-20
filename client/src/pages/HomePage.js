import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { errorMessage } from '../api';
import { getUsername } from '../auth';
import Alert from '../components/Alert';

const HomePage = () => {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all(['/employee', '/leave', '/absence', '/attendance'].map((url) => api.get(url)))
      .then(([employees, leaves, absences, attendance]) => setStats({
        employees: employees.data.length,
        pendingLeaves: leaves.data.filter((l) => l.statut === 'En attente').length,
        absences: absences.data.length,
        hours: attendance.data.reduce((sum, a) => sum + (a.heuresTravaillees || 0), 0).toLocaleString('fr-FR'),
      }))
      .catch((err) => setError(errorMessage(err)));
  }, []);

  const cards = stats && [
    { label: 'Employés', value: stats.employees, to: '/employees', icon: '👥' },
    { label: 'Congés en attente', value: stats.pendingLeaves, to: '/leave', icon: '🌴' },
    { label: 'Absences enregistrées', value: stats.absences, to: '/absences', icon: '📋' },
    { label: 'Heures pointées', value: stats.hours, to: '/attendance', icon: '⏱️' },
  ];

  return (
    <div>
      <h1>Bonjour {getUsername()} 👋</h1>
      <p className="muted">Bienvenue dans le système de gestion des ressources humaines.</p>
      <Alert>{error}</Alert>
      {!stats && !error && <p>Chargement…</p>}
      {stats && (
        <div className="stats">
          {cards.map((c) => (
            <Link key={c.label} to={c.to} className="card stat">
              <span className="stat-icon" aria-hidden="true">{c.icon}</span>
              <span className="stat-value">{c.value}</span>
              <span className="stat-label">{c.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
