import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const LeaveComponent = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/leave');
        const leaveRequestsWithEmployees = await Promise.all(
          response.data.map(async request => {
            try {
              const employeeResponse = await axios.get(`http://localhost:3001/api/employee/${request.employe}`);
              const employeeData = employeeResponse.data;
              return { ...request, employe: employeeData };
            } catch (error) {
              console.error('Erreur lors de la récupération des données de l\'employé:', error);
              return request;
            }
          })
        );
        setLeaveRequests(leaveRequestsWithEmployees.reverse());
      } catch (error) {
        console.error('Erreur lors du chargement des demandes de congé:', error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleDeleteLeave = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/leave/${id}`);
      setLeaveRequests(prevLeaveRequests => prevLeaveRequests.filter(request => request._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de la demande de congé:', error);
    }
  };

  const handleAddLeave = async (newLeave) => {
    setLeaveRequests(prevLeaveRequests => prevLeaveRequests.concat(newLeave));
  };

  return (
    <div>
      <h2>Liste des demandes de congé</h2>
      <Link to="/addLeave"><button>Ajouter une demande de congé</button></Link>
      <table>
        <thead>
          <tr>
            <th>Employé</th>
            <th>Type</th>
            <th>Début</th>
            <th>Fin</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map(request => (
            <tr key={request._id}>
              <td>{request.employe && `${request.employe.nom} ${request.employe.prenom}`}</td>
              <td>{request.type}</td>
              <td>{new Date(request.dateDebut).toLocaleDateString()}</td>
              <td>{new Date(request.dateFin).toLocaleDateString()}</td>
              <td>{request.statut}</td>
              <td>
                <button onClick={() => handleDeleteLeave(request._id)}>Supprimer</button>
                <Link to={`/updateLeave/${request._id}`}><button>Mettre à jour</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveComponent;
