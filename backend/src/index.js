import express from 'express';
import connect from './config/database.js';
import cors from 'cors';
import { PORT } from './config/config.js';
import { logger } from "./config/logger.js";
import morgan from 'morgan';
import apiRoutes from "./routes/index.js";
import passport from 'passport';
import { passportAuth } from "./config/jwt-middleware.js";
import cookieParser from 'cookie-parser';
import path from 'path';

const app = express();
const morganFormat = ':method :url :status :response-time ms';
const _dirname = path.resolve();

// ✅ Fix: Allow frontend to access backend APIs
app.use(cors({
    origin: ["http://localhost:5173", "https://spotify-app-pkha.onrender.com"],
    credentials: true
}));

app.use(morgan(morganFormat, {
    stream: {
        write: (message) => {
            const logObject = {
                method: message.split(' ')[0],
                url: message.split(' ')[1],
                status: message.split(' ')[2],
                responseTime: message.split(' ')[3]
            };
            logger.info(JSON.stringify(logObject));
        }
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());
passportAuth(passport);
app.use('/api', apiRoutes);

// ✅ Fix: Serve frontend files from correct `dist` folder
app.use(express.static(path.join(_dirname, 'frontend', 'dist')));

// ✅ Fix: Handle frontend routing (for React Router)
app.get('*', (_, res) => {
    res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'));
});

const setupAndStartServer = function () {
    app.listen(PORT, async () => {
        console.log(`Server started on port: ${PORT}`);
        await connect();
        console.log('MongoDB connected');
    });
};

setupAndStartServer();
