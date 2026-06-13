import express from "express";
import cors from "cors";
import 'dotenv/config';

import predictRouter from "./routes/predictRoute.js";

// App Configuration
const app = express();
const port = process.env.PORT || 8000;

// Middlewares
app.use(express.json());

// Restrict CORS in production
app.use(cors({
    origin: ['http://localhost:5178'],
    credentials: true
}));

app.use("/api/predict", predictRouter);

const startServer = () => {
    try {
        app.listen(port, () => console.log(`Server started on PORT: ${port}`));
    } catch (error) {
        console.error("Startup error:", error);
        process.exit(1);
    }
};

startServer();