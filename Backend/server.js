import express from 'express';
import cors from 'cors'; // Agar frontend se connect karna hai toh ye zaroori hai

// Routes Import
import authRoutes from './routes/auth.routes.js';
import eventRoutes from './routes/event.routes.js';
import societyRoutes from './routes/society.routes.js';

const app = express();

// 1. Middlewares
app.use(cors()); // Frontend (React) ko backend se baat karne ki permission deta hai
app.use(express.json()); // JSON data ko parse karne ke liye (req.body)
app.use(express.urlencoded({ extended: true })); // Form data handle karne ke liye

// 2. Routes Mounting
// Yahan humne versioning (v1) use ki hai jo professional standard hai
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/societies', societyRoutes);


// 4. Global Error Handler (Ek extra layer security ke liye)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
        stack: process.env.NODE_ENV === 'development' ? err.stack : null,
    });
});

export default app;