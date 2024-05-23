import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateAttendancePage = () => {
  const { id } = useParams();
  const [attendanceData, setAttendanceData] = useState({
    date: '',
    heuresTravaillees: '',
    employe: ''
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/attendance/${id}`);
        const fetchedAttendanceData = response.data;
        setAttendanceData({
          ...fetchedAttendanceData,
          date: fetchedAttendanceData.date.split('T')[0]
        });
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors du chargement des données de pointage:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/employee');
        setEmployees(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des employés:', error);
      }
    };

    fetchAttendanceData();
    fetchEmployees();
  }, [id]);

  const handleSub = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/attendance/${id}`, attendanceData);
      console.log('Données de pointage mises à jour avec succès.');
      window.location.href = '/attendance';
    } catch (error) {
      console.error('Quelque chose s\'est mal passé lors de la mise à jour des données de pointage:', error);
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setAttendanceData({ ...attendanceData, [e.target.name]: e.target.value });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Modifier un enregistrement de pointage</h2>
      <form onSubmit={handleSub}>
        <label>
          Date:
          <input type="date" name="date" value={attendanceData.date} onChange={handleChange} />
        </label>
        <label>
          Heures travaillées:
          <input type="number" name="heuresTravaillees" value={attendanceData.heuresTravaillees} onChange={handleChange} />
        </label>
        <label>
          Employé:
          <select name="employe" value={attendanceData.employe} onChange={handleChange}>
            {employees.map(employee => (
              <option key={employee._id} value={employee._id}>
                {employee.nom} {employee.prenom}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default UpdateAttendancePage;
