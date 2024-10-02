import React, { useState } from 'react';
import axios from 'axios'; // Asegúrate de que axios esté importado desde 'axios'
import '../styles/Register.css';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        email: '',
        phone: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Cambié la URL para que apunte a tu endpoint de registro
            const response = await axios.post('http://localhost:5000/register', formData);
            alert(response.data);
        } catch (error) {
            console.error('Error durante el registro:', error);
            alert('Error durante el registro');
        }
    };

    return (
        <div className="register">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
                <input type="number" name="age" placeholder="Age" onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
                <input type="tel" name="phone" placeholder="Phone" onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}

export default Register;
