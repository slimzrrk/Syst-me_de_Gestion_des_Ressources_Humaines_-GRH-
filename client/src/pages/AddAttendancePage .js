import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddAttendancePage = () => {
  const [newAttendanceData, setNewAttendanceData] = useState({
    date: '',
    heuresTravaillees: '',
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
    setNewAttendanceData({ ...newAttendanceData, [name]: value });
  };

  const handleAddAttendance = async () => {
    try {
      await axios.post('http://localhost:3001/api/attendance', newAttendanceData);
      window.location.href = '/attendance';
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'enregistrement de pointage:', error);
    }
  };

  return (
    <div>
      <h2>Ajouter un enregistrement de pointage</h2>
      <form onSubmit={handleAddAttendance}>
        <label>
          Date:
          <input type="date" name="date" value={newAttendanceData.date} onChange={handleInputChange} />
        </label>
        <label>
          Heures travaillées:
          <input type="number" name="heuresTravaillees" value={newAttendanceData.heuresTravaillees} onChange={handleInputChange} />
        </label>
        <label>
          Employé:
          <select name="employe" value={newAttendanceData.employe} onChange={handleInputChange}>
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

export default AddAttendancePage;
