// /backend/controllers/userController.js
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const registerUser = (db) => async (req, res) => {
    const { name, age, email, phone, password } = req.body;

    const userModel = new User(db);

    // Validar la existencia del usuario
    const existingUser = await userModel.findUserByEmail(email);
    if (existingUser) {
        return res.status(400).json('Email ya registrado');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await userModel.createUser({ name, age, email, phone, password: hashedPassword });
        res.status(201).json('Usuario registrado con éxito');
    } catch (error) {
        res.status(500).json('Error al registrar el usuario');
    }
};
