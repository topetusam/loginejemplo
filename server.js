// /backend/server.js
import 'dotenv/config';
import express from 'express';
import Connect from './connect.js';
import cors from 'cors'; // Asegúrate de importar cors
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = 5000;

const dbConnection = new Connect();

app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json()); // Para manejar JSON en las solicitudes

(async () => {
    try {
        await dbConnection.open(); // Intenta abrir la conexión

        // Rutas
        app.use('/api', userRoutes);

        app.listen(port, () => {
            console.log(`Servidor corriendo en http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
    }
})();
