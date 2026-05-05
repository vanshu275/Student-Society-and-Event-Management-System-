import dotenv from 'dotenv';
import dns from "dns";
import app from './server.js';
import { connectDB } from './config/db.connection.js';

// Load Env
dotenv.config();

// DNS Setup
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT || 8000;

// Start Server after DB Connection
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to start the server:", error.message);
        process.exit(1);
    }
};

startServer();