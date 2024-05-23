import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';

const UpdateAbsencePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [absenceData, setAbsenceData] = useState({
    date: '',
    motif: '',
    heuresManquees: '',
    employe: ''
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAbsenceData();
    fetchEmployees();
  }, []);

  const fetchAbsenceData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/absence/${id}`);
      const fetchedAbsenceData = response.data;
      setAbsenceData({
        ...fetchedAbsenceData,
        date: fetchedAbsenceData.date.split('T')[0]
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching absence data:', error);
      setError(error.message);
      setLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/employee');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSub = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/absence/${id}`, absenceData);
      console.log('Absence updated successfully.');
      navigate('/absences');
    } catch (error) {
      console.error('Something went wrong!', error);
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setAbsenceData({ ...absenceData, [e.target.name]: e.target.value });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Modifier une absence</h2>
      <form onSubmit={handleSub}>
        <label>
          Date:
          <input type="date" name="date" value={absenceData.date} onChange={handleChange} />
        </label>
        <label>
          Motif:
          <input type="text" name="motif" value={absenceData.motif} onChange={handleChange} />
        </label>
        <label>
          Heures manquées:
          <input type="number" name="heuresManquees" value={absenceData.heuresManquees} onChange={handleChange} />
        </label>
        <label>
          Employé:
          <select name="employe" value={absenceData.employe} onChange={handleChange}>
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

export default UpdateAbsencePage;
