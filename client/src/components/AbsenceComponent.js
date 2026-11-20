import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api, { errorMessage, formatDate } from '../api';
import Alert from './Alert';

const AbsenceComponent = () => {
  const [absences, setAbsences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/absence')
      .then((response) => setAbsences(response.data))
      .catch((err) => setError(errorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteAbsence = async (id) => {
    if (!window.confirm('Supprimer cette absence ?')) return;
    try {
      await api.delete(`/absence/${id}`);
      setAbsences((list) => list.filter((absence) => absence._id !== id));
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  return (
    <div>
      <div className="toolbar">
        <h2>Liste des absences</h2>
        <Link to="/addAbsence" className="button-link">+ Ajouter une absence</Link>
      </div>
      <Alert>{error}</Alert>
      {loading ? <p>Chargement…</p> : absences.length === 0 ? (
        <p className="empty">Aucune absence enregistrée.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Employé</th>
              <th>Date</th>
              <th>Motif</th>
              <th>Heures manquées</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {absences.map((absence) => (
              <tr key={absence._id}>
                <td>{absence.employe ? `${absence.employe.nom} ${absence.employe.prenom}` : '—'}</td>
                <td>{formatDate(absence.date)}</td>
                <td>{absence.motif}</td>
                <td>{absence.heuresManquees}</td>
                <td className="actions">
                  <Link to={`/updateAbsence/${absence._id}`} className="button-link btn-small">Modifier</Link>
                  <button type="button" className="btn-small btn-danger" onClick={() => handleDeleteAbsence(absence._id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AbsenceComponent;
