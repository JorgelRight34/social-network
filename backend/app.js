import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import router from "./routes/index.js";
import sequelize from "./config/db.js";

dotenv.config();

// App
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(morgan('dev')); // Logs
app.use(cors());    // CORS policies
app.use('/static', express.static(`./${process.env.STATIC_URL}`))
app.use(express.json());    // Parse body requests to JSON

// Routes
app.use('/', router);

// Run migrations
sequelize.sync({ alter: true, logging: false })
    .then(() => console.log('Database synced'))
    .catch((err) => console.error('Error syncing database', err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
})