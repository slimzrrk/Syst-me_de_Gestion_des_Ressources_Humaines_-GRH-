import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api, { errorMessage, formatDate } from '../api';
import Alert from './Alert';

const STATUS_CLASS = { 'En attente': 'badge-pending', 'Approuvé': 'badge-ok', 'Rejeté': 'badge-ko' };

const LeaveComponent = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/leave')
      .then((response) => setLeaveRequests(response.data))
      .catch((err) => setError(errorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteLeave = async (id) => {
    if (!window.confirm('Supprimer cette demande de congé ?')) return;
    try {
      await api.delete(`/leave/${id}`);
      setLeaveRequests((list) => list.filter((request) => request._id !== id));
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  return (
    <div>
      <div className="toolbar">
        <h2>Liste des demandes de congé</h2>
        <Link to="/addLeave" className="button-link">+ Ajouter une demande de congé</Link>
      </div>
      <Alert>{error}</Alert>
      {loading ? <p>Chargement…</p> : leaveRequests.length === 0 ? (
        <p className="empty">Aucune demande de congé.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Employé</th>
              <th>Type</th>
              <th>Début</th>
              <th>Fin</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request._id}>
                <td>{request.employe ? `${request.employe.nom} ${request.employe.prenom}` : '—'}</td>
                <td>{request.type}</td>
                <td>{formatDate(request.dateDebut)}</td>
                <td>{formatDate(request.dateFin)}</td>
                <td><span className={`badge ${STATUS_CLASS[request.statut] || ''}`}>{request.statut}</span></td>
                <td className="actions">
                  <Link to={`/updateLeave/${request._id}`} className="button-link btn-small">Modifier</Link>
                  <button type="button" className="btn-small btn-danger" onClick={() => handleDeleteLeave(request._id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeaveComponent;
