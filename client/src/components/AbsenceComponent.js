import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AbsenceComponent = () => {
  const [absences, setAbsences] = useState([]);

  useEffect(() => {
    const fetchAbsences = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/absence');
        const absencesWithEmployees = await Promise.all(
          response.data.map(async (absence) => {
            try {
              const employeeResponse = await axios.get(`http://localhost:3001/api/employee/${absence.employe}`);
              const employeeData = employeeResponse.data; 
              return { ...absence, employe: employeeData }; 
            } catch (error) {
              console.error('Erreur lors de la récupération des données de l\'employé:', error);
              return absence; 
            }
          })
        );
        setAbsences(absencesWithEmployees.reverse()); 
      } catch (error) {
        console.error('Erreur lors du chargement des absences:', error);
      }
    };

    fetchAbsences();
  }, []);

  const handleDeleteAbsence = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/absence/${id}`);
      setAbsences(absences.filter((absence) => absence._id !== id));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'absence:', error);
    }
  };

  return (
    <div>
      <h2>Liste des absences</h2>
      <Link to="/addAbsence"><button type="button">Ajouter une absence</button></Link>
      <table>
        <thead>
          <tr>
            <th>Employé</th>
            <th>Date</th>
            <th>Motif</th>
            <th>Heures manquées</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {absences.map((absence) => (
            <tr key={absence._id}>
              <td>{absence.employe && `${absence.employe.nom} ${absence.employe.prenom}`}</td>
              <td>{new Date(absence.date).toLocaleDateString()}</td>
              <td>{absence.motif}</td>
              <td>{absence.heuresManquees}</td>
              <td>
                <button onClick={() => handleDeleteAbsence(absence._id)}>Supprimer</button>
                <Link to={`/updateAbsence/${absence._id}`}><button>Mettre à jour</button></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AbsenceComponent;
