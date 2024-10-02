import { MongoClient } from 'mongodb';

export default class Connect {
    client; 
    db;
    static instanceConnect;

    constructor() {
        if (Connect.instanceConnect) return Connect.instanceConnect;
        Connect.instanceConnect = this;
        return Connect.instanceConnect;
    }

    async open() {
        const uri = `${process.env.MONGO_PROTOCOLO}${process.env.MONGO_USER}:${process.env.MONGO_PSW}@${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
        console.log(uri);
        try {
            this.client = new MongoClient(uri); 
            await this.client.connect(); 
            this.db = this.client.db("cineCampus"); 
            console.log("Conectado a la base de datos correctamente.");
        } catch (error) {
            console.error("Error al conectar con la base de datos:", error);
            throw error; // Lanza el error para que sea manejado en otros métodos
        }
    }

    async close() {
        if (this.client) {
            try {
                await this.client.close(); // Cerrar la conexión correctamente
                console.log('Conexión cerrada');
            } catch (error) {
                console.error('Error al cerrar la conexión:', error);
            }
        }
    }
};
