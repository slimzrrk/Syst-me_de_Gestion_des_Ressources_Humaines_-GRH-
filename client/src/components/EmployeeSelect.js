import React, { useEffect, useState } from 'react';
import api from '../api';

// Liste déroulante des employés, utilisée par les formulaires de congés, absences et pointages.
const EmployeeSelect = ({ value, onChange, name = 'employe' }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get('/employee').then((response) => setEmployees(response.data)).catch(() => setEmployees([]));
  }, []);

  return (
    <select name={name} value={value} onChange={onChange} required>
      <option value="">Sélectionnez un employé</option>
      {employees.map((employee) => (
        <option key={employee._id} value={employee._id}>{employee.nom} {employee.prenom}</option>
      ))}
    </select>
  );
};

export default EmployeeSelect;
