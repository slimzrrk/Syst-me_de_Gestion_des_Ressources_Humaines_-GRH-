import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api, { errorMessage } from '../api';
import Alert from '../components/Alert';

const UpdateEmployeePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/employee/${id}`)
      .then(({ data }) => setEmployeeData({
        nom: data.nom, prenom: data.prenom, email: data.email,
        poste: data.poste, departement: data.departement, dateEmbauche: data.dateEmbauche,
      }))
      .catch((err) => setError(errorMessage(err)));
  }, [id]);

  const handleSub = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.put(`/employee/${id}`, employeeData);
      navigate('/employees');
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  const handleChange = (e) => setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });

  return (
    <div>
      <h2>Modifier un employé</h2>
      <div className="card form-card">
        <Alert>{error}</Alert>
        {!employeeData ? (!error && <p>Chargement…</p>) : (
          <form onSubmit={handleSub}>
            <label>Nom<input type="text" name="nom" value={employeeData.nom} onChange={handleChange} required /></label>
            <label>Prénom<input type="text" name="prenom" value={employeeData.prenom} onChange={handleChange} required /></label>
            <label>Email<input type="email" name="email" value={employeeData.email} onChange={handleChange} required /></label>
            <label>Poste<input type="text" name="poste" value={employeeData.poste} onChange={handleChange} required /></label>
            <label>Département<input type="text" name="departement" value={employeeData.departement} onChange={handleChange} required /></label>
            <label>Date d'embauche<input type="date" name="dateEmbauche" value={employeeData.dateEmbauche} onChange={handleChange} required /></label>
            <div className="form-actions">
              <Link to="/employees" className="button-link btn-secondary">Annuler</Link>
              <button type="submit">Enregistrer</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateEmployeePage;
