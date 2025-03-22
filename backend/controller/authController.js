import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const registerUser = async (req, res) => {
    console.log(req.body); // Log the request body for debugging

    // Validate the request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Extract user data from the request body
    const { full_name, email, password, address, phone_number } = req.body;

    try {
        // Hash the password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const password_hash = await bcrypt.hash(password, salt);

        // Insert the user into the database
        const query = `
            INSERT INTO users (full_name, email, password_hash, address, phone_number)
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [full_name, email, password_hash, address, phone_number];

        db.query(query, values, (err, result) => {
            if (err) {
                // Handle database errors (e.g., duplicate email)
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ error: 'Email already exists' });
                }
                return res.status(500).json({ error: err.message });
            }

            // Success response
            res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
        });
    } catch (error) {
        // Handle unexpected errors
        res.status(500).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    // Validate the request body using express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Fetch the user from the database
        const query = "SELECT * FROM users WHERE email = ?";
        db.query(query, [email], async (err, results) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            if (results.length === 0) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            const user = results[0];

            // Compare the provided password with the hashed password in the database
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                return res.status(400).json({ error: "Invalid credentials" });
            }

            // Generate a JWT token
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            // Return the token and user data (excluding password_hash)
            const { password_hash, ...userData } = user;
            res.status(200).json({ message: "Login successful", token, user: userData });
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { registerUser, loginUser };