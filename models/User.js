// /backend/models/User.js
import { ObjectId } from 'mongodb';

export default class User {
    constructor(db) {
        this.collection = db.collection('cliente'); // Nombre de la colección
    }

    async createUser(data) {
        const { name, age, email, phone, password } = data;
        const user = {
            _id: new ObjectId(),
            name,
            age,
            email,
            phone,
            password, // Asegúrate de hashear la contraseña antes de guardarla
        };
        return await this.collection.insertOne(user);
    }

    async findUserByEmail(email) {
        return await this.collection.findOne({ email });
    }
}
