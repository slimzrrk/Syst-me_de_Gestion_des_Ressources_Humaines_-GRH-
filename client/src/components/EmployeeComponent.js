import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api, { errorMessage, formatDate } from '../api';
import Alert from './Alert';

const EmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/employee')
      .then((response) => setEmployees(response.data))
      .catch((err) => setError(errorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteEmployee = async (employee) => {
    const ok = window.confirm(`Supprimer ${employee.prenom} ${employee.nom} ? Ses congés, absences et pointages seront aussi supprimés.`);
    if (!ok) return;
    try {
      await api.delete(`/employee/${employee._id}`);
      setEmployees((list) => list.filter((e) => e._id !== employee._id));
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  return (
    <div>
      <div className="toolbar">
        <h2>Liste des employés</h2>
        <Link to="/addEmployee" className="button-link">+ Ajouter un employé</Link>
      </div>
      <Alert>{error}</Alert>
      {loading ? <p>Chargement…</p> : employees.length === 0 ? (
        <p className="empty">Aucun employé pour le moment.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Poste</th>
              <th>Département</th>
              <th>Embauche</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.nom}</td>
                <td>{employee.prenom}</td>
                <td>{employee.email}</td>
                <td>{employee.poste}</td>
                <td>{employee.departement}</td>
                <td>{formatDate(employee.dateEmbauche)}</td>
                <td className="actions">
                  <Link to={`/updateEmployee/${employee._id}`} className="button-link btn-small">Modifier</Link>
                  <button type="button" className="btn-small btn-danger" onClick={() => handleDeleteEmployee(employee)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default EmployeeComponent;
