import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";
import UserRouter from "./router/UserRouter.js";
import AuthRouter from "./router/AuthRouter.js"; // New auth routes

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database connection
db.connect()
  .then(() => console.log("Connected to SDP database"))
  .catch(err => console.error("Database connection error:", err));

// Routes
app.use("/api/users", UserRouter); // For user management
app.use("/api/auth", AuthRouter); // For authentication

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});