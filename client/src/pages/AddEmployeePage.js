import React, { useState } from 'react';
import axios from 'axios';

const AddEmployeePage = ({ history, setEmployees }) => {
    
  const [newEmployeeData, setNewEmployeeData] = useState({
    nom: '',
    prenom: '',
    email: '',
    poste: '',
    departement: '',
    dateEmbauche: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmployeeData({ ...newEmployeeData, [name]: value });
  };

  const handleAddEmployee = async () => {
    try {
        const response = await axios.post('http://localhost:3001/api/employee', newEmployeeData); 
        console.log('Response:', response.data);
        window.location.href = '/employees';
        setEmployees(prevEmployees => [response.data, ...prevEmployees]);
        

    } catch (error) {
        console.error('Erreur lors de l\'ajout de l\'employé:', error);
    }
};


  return (
    <div>
      <h2>Ajouter un employé</h2>
      <form onSubmit={handleAddEmployee}>
        <label>
          Nom:
          <input type="text" name="nom" value={newEmployeeData.nom} onChange={handleInputChange} />
        </label>
        <label>
          Prénom:
          <input type="text" name="prenom" value={newEmployeeData.prenom} onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={newEmployeeData.email} onChange={handleInputChange} />
        </label>
        <label>
          Poste:
          <input type="text" name="poste" value={newEmployeeData.poste} onChange={handleInputChange} />
        </label>
        <label>
          Département:
          <input type="text" name="departement" value={newEmployeeData.departement} onChange={handleInputChange} />
        </label>
        <label>
          Date d'embauche:
          <input type="date" name="dateEmbauche" value={newEmployeeData.dateEmbauche} onChange={handleInputChange} />
        </label>
        
       
        <button type="submit">Ajouter</button>
        
      </form>
    </div>
  );
};

export default AddEmployeePage;
