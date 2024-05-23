import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateLeavePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leaveData, setLeaveData] = useState({
    type: '',
    dateDebut: '',
    dateFin: '',
    statut: '',
    employe: '',
    dateDemande: ''
  });
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLeaveData();
    fetchEmployees();
  }, []);

  const fetchLeaveData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/api/leave/${id}`);
      const fetchedLeaveData = response.data;
      setLeaveData({
        ...fetchedLeaveData,
        dateDebut: fetchedLeaveData.dateDebut.split('T')[0],
        dateFin: fetchedLeaveData.dateFin.split('T')[0],
        dateDemande: fetchedLeaveData.dateDemande.split('T')[0]
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching leave data:', error);
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
      await axios.put(`http://localhost:3001/api/leave/${id}`, leaveData);
      console.log('Response:', leaveData);
      navigate('/leave');
    } catch (error) {
      console.error('Something went wrong!', error);
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    setLeaveData({ ...leaveData, [e.target.name]: e.target.value });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Modifier une demande de congé</h2>
      <form onSubmit={handleSub}>
        <label>
          Type:
          <input type="text" name="type" value={leaveData.type} onChange={handleChange} />
        </label>
        <label>
          Date de début:
          <input type="date" name="dateDebut" value={leaveData.dateDebut} onChange={handleChange} />
        </label>
        <label>
          Date de fin:
          <input type="date" name="dateFin" value={leaveData.dateFin} onChange={handleChange} />
        </label>
        <label>
          Statut:
          <input type="text" name="statut" value={leaveData.statut} onChange={handleChange} />
        </label>
        <label>
          Employé:
          <select name="employe" value={leaveData.employe} onChange={handleChange}>
            {employees.map(employee => (
              <option key={employee._id} value={employee._id}>
                {employee.nom} {employee.prenom}
              </option>
            ))}
          </select>
        </label>
        <label>
          Date de demande:
          <input type="date" name="dateDemande" value={leaveData.dateDemande} onChange={handleChange} />
        </label>

        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default UpdateLeavePage;
