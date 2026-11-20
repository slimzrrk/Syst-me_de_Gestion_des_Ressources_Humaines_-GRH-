import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api, { errorMessage } from '../api';
import Alert from '../components/Alert';
import EmployeeSelect from '../components/EmployeeSelect';

const UpdateAttendancePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [attendanceData, setAttendanceData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/attendance/${id}`)
      .then(({ data }) => setAttendanceData({
        date: data.date.split('T')[0], heuresTravaillees: data.heuresTravaillees, employe: data.employe,
      }))
      .catch((err) => setError(errorMessage(err)));
  }, [id]);

  const handleSub = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await api.put(`/attendance/${id}`, attendanceData);
      navigate('/attendance');
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  const handleChange = (e) => setAttendanceData({ ...attendanceData, [e.target.name]: e.target.value });

  return (
    <div>
      <h2>Modifier un pointage</h2>
      <div className="card form-card">
        <Alert>{error}</Alert>
        {!attendanceData ? (!error && <p>Chargement…</p>) : (
          <form onSubmit={handleSub}>
            <label>Employé<EmployeeSelect value={attendanceData.employe} onChange={handleChange} /></label>
            <label>Date<input type="date" name="date" value={attendanceData.date} onChange={handleChange} required /></label>
            <label>Heures travaillées<input type="number" name="heuresTravaillees" min="0" max="24" step="0.5" value={attendanceData.heuresTravaillees} onChange={handleChange} required /></label>
            <div className="form-actions">
              <Link to="/attendance" className="button-link btn-secondary">Annuler</Link>
              <button type="submit">Enregistrer</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateAttendancePage;
