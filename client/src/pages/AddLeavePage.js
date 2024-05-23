import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddLeavePage = ({ setLeaves }) => {
  const navigate = useNavigate();
  const [newLeaveData, setNewLeaveData] = useState({
    type: '',
    dateDebut: '',
    dateFin: '',
    statut: 'En attente',
    employe: '',
    dateDemande: new Date().toISOString().split('T')[0]
  });

  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/employee');
        setEmployees(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des employés:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewLeaveData({ ...newLeaveData, [name]: value });
  };

  const handleAddLeave = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/leave', newLeaveData);
      const newLeave = response.data;
      window.location.href = '/leave';
      setLeaves(prevLeaves => [newLeave, ...prevLeaves]);

    } catch (error) {
      console.error('Erreur lors de l\'ajout de la demande de congé:', error);
    }
  };

  return (
    <div>
      <h2>Ajouter une demande de congé</h2>
      <form onSubmit={handleAddLeave}>
        <label>
          Type:
          <input type="text" name="type" value={newLeaveData.type} onChange={handleInputChange} />
        </label>
        <label>
          Date de début:
          <input type="date" name="dateDebut" value={newLeaveData.dateDebut} onChange={handleInputChange} />
        </label>
        <label>
          Date de fin:
          <input type="date" name="dateFin" value={newLeaveData.dateFin} onChange={handleInputChange} />
        </label>
        <label>
          Employé:
          <select name="employe" value={newLeaveData.employe} onChange={handleInputChange}>
            <option value="">Sélectionnez un employé</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>{employee.nom} {employee.prenom}</option>
            ))}
          </select>
        </label>
        <input type="hidden" name="statut" value="En attente" />
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddLeavePage;
