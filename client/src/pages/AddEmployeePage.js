import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api, { errorMessage } from '../api';
import Alert from '../components/Alert';

const AddEmployeePage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [newEmployeeData, setNewEmployeeData] = useState({
    nom: '', prenom: '', email: '', poste: '', departement: '', dateEmbauche: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployeeData({ ...newEmployeeData, [name]: value });
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault(); // évite le rechargement de la page pendant l'envoi
    setError('');
    try {
      await api.post('/employee', newEmployeeData);
      navigate('/employees');
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  return (
    <div>
      <h2>Ajouter un employé</h2>
      <div className="card form-card">
        <Alert>{error}</Alert>
        <form onSubmit={handleAddEmployee}>
          <label>Nom<input type="text" name="nom" value={newEmployeeData.nom} onChange={handleInputChange} required /></label>
          <label>Prénom<input type="text" name="prenom" value={newEmployeeData.prenom} onChange={handleInputChange} required /></label>
          <label>Email<input type="email" name="email" value={newEmployeeData.email} onChange={handleInputChange} required /></label>
          <label>Poste<input type="text" name="poste" value={newEmployeeData.poste} onChange={handleInputChange} required /></label>
          <label>Département<input type="text" name="departement" value={newEmployeeData.departement} onChange={handleInputChange} required /></label>
          <label>Date d'embauche<input type="date" name="dateEmbauche" value={newEmployeeData.dateEmbauche} onChange={handleInputChange} required /></label>
          <div className="form-actions">
            <Link to="/employees" className="button-link btn-secondary">Annuler</Link>
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeePage;
