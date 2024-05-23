import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddAbsencePage = ({ setAbsences }) => {
  const [newAbsenceData, setNewAbsenceData] = useState({
    date: '',
    motif: '',
    heuresManquees: '',
    employe: ''
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
    setNewAbsenceData({ ...newAbsenceData, [name]: value });
  };

  const handleAddAbsence = async () => {
    try {
      const response = await axios.post('http://localhost:3001/api/absence', newAbsenceData);
      const newAbsence = response.data;
      window.location.href = '/absences';
      setAbsences(prevAbsences => [newAbsence, ...prevAbsences]); 
      
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'absence:', error);
    }
  };

  return (
    <div>
      <h2>Ajouter une absence</h2>
      <form onSubmit={handleAddAbsence}>
        <label>
          Date:
          <input type="date" name="date" value={newAbsenceData.date} onChange={handleInputChange} />
        </label>
        <label>
          Motif:
          <input type="text" name="motif" value={newAbsenceData.motif} onChange={handleInputChange} />
        </label>
        <label>
          Heures manquées:
          <input type="number" name="heuresManquees" value={newAbsenceData.heuresManquees} onChange={handleInputChange} />
        </label>
        <label>
          Employé:
          <select name="employe" value={newAbsenceData.employe} onChange={handleInputChange}>
            <option value="">Sélectionnez un employé</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>{employee.nom} {employee.prenom}</option>
            ))}
          </select>
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
};

export default AddAbsencePage;
