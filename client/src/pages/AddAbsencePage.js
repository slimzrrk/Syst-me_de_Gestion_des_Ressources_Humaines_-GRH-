import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api, { errorMessage } from '../api';
import Alert from '../components/Alert';
import EmployeeSelect from '../components/EmployeeSelect';

const AddAbsencePage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [newAbsenceData, setNewAbsenceData] = useState({ date: '', motif: '', heuresManquees: '', employe: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAbsenceData({ ...newAbsenceData, [name]: value });
  };

  const handleAddAbsence = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/absence', newAbsenceData);
      navigate('/absences');
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  return (
    <div>
      <h2>Ajouter une absence</h2>
      <div className="card form-card">
        <Alert>{error}</Alert>
        <form onSubmit={handleAddAbsence}>
          <label>Employé<EmployeeSelect value={newAbsenceData.employe} onChange={handleInputChange} /></label>
          <label>Date<input type="date" name="date" value={newAbsenceData.date} onChange={handleInputChange} required /></label>
          <label>Motif<input type="text" name="motif" value={newAbsenceData.motif} onChange={handleInputChange} required /></label>
          <label>Heures manquées<input type="number" name="heuresManquees" min="0" max="24" step="0.5" value={newAbsenceData.heuresManquees} onChange={handleInputChange} required /></label>
          <div className="form-actions">
            <Link to="/absences" className="button-link btn-secondary">Annuler</Link>
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAbsencePage;
