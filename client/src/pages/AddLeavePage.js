import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api, { errorMessage } from '../api';
import Alert from '../components/Alert';
import EmployeeSelect from '../components/EmployeeSelect';

const AddLeavePage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [newLeaveData, setNewLeaveData] = useState({
    type: '', dateDebut: '', dateFin: '', employe: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLeaveData({ ...newLeaveData, [name]: value });
  };

  const handleAddLeave = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/leave', newLeaveData); // statut « En attente » et date de demande fixés par l'API
      navigate('/leave');
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  return (
    <div>
      <h2>Ajouter une demande de congé</h2>
      <div className="card form-card">
        <Alert>{error}</Alert>
        <form onSubmit={handleAddLeave}>
          <label>Employé<EmployeeSelect value={newLeaveData.employe} onChange={handleInputChange} /></label>
          <label>Type<input type="text" name="type" value={newLeaveData.type} onChange={handleInputChange} placeholder="Annuel, maladie, sans solde…" required /></label>
          <label>Date de début<input type="date" name="dateDebut" value={newLeaveData.dateDebut} onChange={handleInputChange} required /></label>
          <label>Date de fin<input type="date" name="dateFin" value={newLeaveData.dateFin} min={newLeaveData.dateDebut || undefined} onChange={handleInputChange} required /></label>
          <div className="form-actions">
            <Link to="/leave" className="button-link btn-secondary">Annuler</Link>
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLeavePage;
