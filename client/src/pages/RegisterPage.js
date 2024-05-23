import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleSub = async () => {
        try {
            const response = await axios.post('http://localhost:3001/api/register', formData);
            window.location.href = '/auth';
            console.log('Response:', response.data);
            setFormData({
                username: '',
                password: ''
            });
        } catch (error) {
            console.error('Something went wrong!', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    return (
        <div className="register-container">
            <h2>S'inscrire</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" value={formData.username} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={formData.password} onChange={handleChange} />
                </div>
                <button type="button" onClick={handleSub}>Submit</button>
            </form>
        </div>
    );
};

export default RegisterPage;
