//server.js

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import UserRouter from "./router/UserRouter.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", UserRouter);
app.use("/api/auth", UserRouter);


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// export default app;
