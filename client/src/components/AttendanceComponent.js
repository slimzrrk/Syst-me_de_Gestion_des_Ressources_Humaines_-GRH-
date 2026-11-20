import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api, { errorMessage, formatDate } from '../api';
import Alert from './Alert';

const AttendanceComponent = () => {
  const [attendances, setAttendances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/attendance')
      .then((response) => setAttendances(response.data))
      .catch((err) => setError(errorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteAttendance = async (id) => {
    if (!window.confirm('Supprimer ce pointage ?')) return;
    try {
      await api.delete(`/attendance/${id}`);
      setAttendances((list) => list.filter((attendance) => attendance._id !== id));
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  return (
    <div>
      <div className="toolbar">
        <h2>Liste des pointages</h2>
        <Link to="/addAttendance" className="button-link">+ Ajouter un pointage</Link>
      </div>
      <Alert>{error}</Alert>
      {loading ? <p>Chargement…</p> : attendances.length === 0 ? (
        <p className="empty">Aucun pointage enregistré.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Employé</th>
              <th>Date</th>
              <th>Heures travaillées</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {attendances.map((attendance) => (
              <tr key={attendance._id}>
                <td>{attendance.employe ? `${attendance.employe.nom} ${attendance.employe.prenom}` : '—'}</td>
                <td>{formatDate(attendance.date)}</td>
                <td>{attendance.heuresTravaillees}</td>
                <td className="actions">
                  <Link to={`/updateAttendance/${attendance._id}`} className="button-link btn-small">Modifier</Link>
                  <button type="button" className="btn-small btn-danger" onClick={() => handleDeleteAttendance(attendance._id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AttendanceComponent;
