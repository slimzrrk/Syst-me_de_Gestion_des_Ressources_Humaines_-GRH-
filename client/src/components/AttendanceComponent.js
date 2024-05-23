import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AttendanceComponent = () => {
  const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    const fetchAttendances = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/attendance');
        const attendancesWithEmployees = await Promise.all(
          response.data.map(async (attendance) => {
            try {
              const employeeResponse = await axios.get(`http://localhost:3001/api/employee/${attendance.employe}`);
              const employeeData = employeeResponse.data; 
              return { ...attendance, employe: employeeData }; 
            } catch (error) {
              console.error('Erreur lors de la récupération des données de l\'employé:', error);
              return attendance; 
            }
          })
        );
        setAttendances(attendancesWithEmployees.reverse());
      } catch (error) {
        console.error('Erreur lors du chargement des attendances:', error);
      }
    };

    fetchAttendances();
  }, []);

  const handleDeleteAttendance = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/attendance/${id}`);
      setAttendances(attendances.filter((attendance) => attendance._id !== id)); 
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'attendance:', error);
    }
  };

  return (
    <div>
      <h2>Liste des pointages</h2>
      <Link to="/addAttendance"><button type="button">Ajouter pointage</button></Link>
      <table>
        <thead>
          <tr>
            <th>Employé</th>
            <th>Date</th>
            <th>Heures Travaillées</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendances.map((attendance) => (
            <tr key={attendance._id}>
              <td>{attendance.employe && `${attendance.employe.nom} ${attendance.employe.prenom}`}</td>
              <td>{new Date(attendance.date).toLocaleDateString()}</td>
              <td>{attendance.heuresTravaillees}</td>
              <td>
                <button onClick={() => handleDeleteAttendance(attendance._id)}>Supprimer</button>
                <Link to={`/updateAttendance/${attendance._id}`}><button>Mettre à jour</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceComponent;
