import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api, { errorMessage } from '../api';
import Alert from '../components/Alert';
import EmployeeSelect from '../components/EmployeeSelect';

const AddAttendancePage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [newAttendanceData, setNewAttendanceData] = useState({ date: '', heuresTravaillees: '', employe: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAttendanceData({ ...newAttendanceData, [name]: value });
  };

  const handleAddAttendance = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/attendance', newAttendanceData);
      navigate('/attendance');
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  return (
    <div>
      <h2>Ajouter un pointage</h2>
      <div className="card form-card">
        <Alert>{error}</Alert>
        <form onSubmit={handleAddAttendance}>
          <label>Employé<EmployeeSelect value={newAttendanceData.employe} onChange={handleInputChange} /></label>
          <label>Date<input type="date" name="date" value={newAttendanceData.date} onChange={handleInputChange} required /></label>
          <label>Heures travaillées<input type="number" name="heuresTravaillees" min="0" max="24" step="0.5" value={newAttendanceData.heuresTravaillees} onChange={handleInputChange} required /></label>
          <div className="form-actions">
            <Link to="/attendance" className="button-link btn-secondary">Annuler</Link>
            <button type="submit">Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAttendancePage;
