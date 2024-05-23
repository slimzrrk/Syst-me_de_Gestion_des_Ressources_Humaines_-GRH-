import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateEmployeePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [employeeData, setEmployeeData] = useState({
        nom: '',
        prenom: '',
        email: '',
        poste:'',
        departement: '',
        dateEmbauche: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEmployeeData();
    }, []);

    const fetchEmployeeData = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/employee/${id}`);
            const employeeData = response.data;
            setEmployeeData(employeeData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching employee data:', error);
            setError(error.message);
            setLoading(false);
        }
    };

    const handleSub = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:3001/api/employee/${id}`, employeeData);
            console.log('Response:', response.data);
            window.location.href = '/employees';
        } catch (error) {
            console.error('Something went wrong!', error);
            setError(error.message);
        }
    };

    const handleChange = (e) => {
        setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Modifier un employé</h2>
            <form onSubmit={handleSub}>
                <label>
                    Nom:
                    <input type="text" name="nom" value={employeeData.nom} onChange={handleChange} />
                </label>
                <label>
                    Prénom:
                    <input type="text" name="prenom" value={employeeData.prenom} onChange={handleChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={employeeData.email} onChange={handleChange} />
                </label>
                <label>
                    Poste:
                    <input type="text" name="poste" value={employeeData.poste} onChange={handleChange} />
                </label>
                <label>
                    Département:
                    <input type="text" name="departement" value={employeeData.departement} onChange={handleChange} />
                </label>
                <label>
                    Date d'embauche:
                    <input type="date" name="dateEmbauche" value={employeeData.dateEmbauche} onChange={handleChange} />
                </label>
                
                
                <button type="submit">Modifier</button>
            </form>
        </div>
    );
};

export default UpdateEmployeePage;
