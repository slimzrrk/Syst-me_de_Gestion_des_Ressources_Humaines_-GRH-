import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api, { errorMessage } from '../api';
import Alert from '../components/Alert';
import EmployeeSelect from '../components/EmployeeSelect';

const STATUTS = ['En attente', 'Approuvé', 'Rejeté'];
const toInputDate = (value) => (value ? value.split('T')[0] : '');

const UpdateLeavePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [leaveData, setLeaveData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/leave/${id}`)
      .then(({ data }) => setLeaveData({
        type: data.type,
        statut: data.statut,
        employe: data.employe,
        dateDebut: toInputDate(data.dateDebut),
        dateFin: toInputDate(data.dateFin),
        dateDemande: toInputDate(data.dateDemande),
      }))
      .catch((err) => setError(errorMessage(err)));
  }, [id]);

  const handleSub = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.put(`/leave/${id}`, leaveData);
      navigate('/leave');
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  const handleChange = (e) => setLeaveData({ ...leaveData, [e.target.name]: e.target.value });

  return (
    <div>
      <h2>Modifier une demande de congé</h2>
      <div className="card form-card">
        <Alert>{error}</Alert>
        {!leaveData ? (!error && <p>Chargement…</p>) : (
          <form onSubmit={handleSub}>
            <label>Employé<EmployeeSelect value={leaveData.employe} onChange={handleChange} /></label>
            <label>Type<input type="text" name="type" value={leaveData.type} onChange={handleChange} required /></label>
            <label>Date de début<input type="date" name="dateDebut" value={leaveData.dateDebut} onChange={handleChange} required /></label>
            <label>Date de fin<input type="date" name="dateFin" value={leaveData.dateFin} min={leaveData.dateDebut || undefined} onChange={handleChange} required /></label>
            <label>
              Statut
              <select name="statut" value={leaveData.statut} onChange={handleChange}>
                {STATUTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </label>
            <label>Date de demande<input type="date" name="dateDemande" value={leaveData.dateDemande} onChange={handleChange} /></label>
            <div className="form-actions">
              <Link to="/leave" className="button-link btn-secondary">Annuler</Link>
              <button type="submit">Enregistrer</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateLeavePage;
