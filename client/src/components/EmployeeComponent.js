import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/employee');
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/employee/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  
  const reversedEmployees = [...employees].reverse();

  return (
    <div>
      <h2>Liste des employés</h2>
      <Link to="/addEmployee" className="button-link">Ajouter un employé</Link> 
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reversedEmployees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.nom}</td>
              <td>{employee.prenom}</td>
              <td>{employee.email}</td>
              <td>
                <button onClick={() => handleDeleteEmployee(employee._id)}>Supprimer</button>
                <Link to={`/updateEmployee/${employee._id}`}><button>Mettre à jour</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeComponent;
