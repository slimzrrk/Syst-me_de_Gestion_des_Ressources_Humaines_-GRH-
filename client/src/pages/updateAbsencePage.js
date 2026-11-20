import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api, { errorMessage } from '../api';
import Alert from '../components/Alert';
import EmployeeSelect from '../components/EmployeeSelect';

const UpdateAbsencePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [absenceData, setAbsenceData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/absence/${id}`)
      .then(({ data }) => setAbsenceData({
        date: data.date.split('T')[0], motif: data.motif, heuresManquees: data.heuresManquees, employe: data.employe,
      }))
      .catch((err) => setError(errorMessage(err)));
  }, [id]);

  const handleSub = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.put(`/absence/${id}`, absenceData);
      navigate('/absences');
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  const handleChange = (e) => setAbsenceData({ ...absenceData, [e.target.name]: e.target.value });

  return (
    <div>
      <h2>Modifier une absence</h2>
      <div className="card form-card">
        <Alert>{error}</Alert>
        {!absenceData ? (!error && <p>Chargement…</p>) : (
          <form onSubmit={handleSub}>
            <label>Employé<EmployeeSelect value={absenceData.employe} onChange={handleChange} /></label>
            <label>Date<input type="date" name="date" value={absenceData.date} onChange={handleChange} required /></label>
            <label>Motif<input type="text" name="motif" value={absenceData.motif} onChange={handleChange} required /></label>
            <label>Heures manquées<input type="number" name="heuresManquees" min="0" max="24" step="0.5" value={absenceData.heuresManquees} onChange={handleChange} required /></label>
            <div className="form-actions">
              <Link to="/absences" className="button-link btn-secondary">Annuler</Link>
              <button type="submit">Enregistrer</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateAbsencePage;
