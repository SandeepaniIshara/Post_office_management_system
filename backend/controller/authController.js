import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

const authController = {
    async registerUser(req, res) {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false,
                errors: errors.array() 
            });
        }

        const { full_name, email, password, address, phone_number } = req.body;

        try {
            // Check if user exists
            const [existingUser] = await new Promise((resolve, reject) => {
                db.query(
                    "SELECT id FROM users WHERE email = ?",
                    [email],
                    (err, results) => {
                        if (err) reject(err);
                        resolve(results);
                    }
                );
            });

            if (existingUser) {
                return res.status(409).json({
                    success: false,
                    error: "Email already registered"
                });
            }

            // Hash password
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            // Create user
            const [result] = await new Promise((resolve, reject) => {
                db.query(
                    `INSERT INTO users 
                    (full_name, email, password_hash, address, phone_number, userType) 
                    VALUES (?, ?, ?, ?, ?, ?)`,
                    [full_name, email, passwordHash, address, phone_number, 'Postal Clerk'],
                    (err, results) => {
                        if (err) reject(err);
                        resolve(results);
                    }
                );
            });

            // Generate JWT token
            const token = jwt.sign(
                { 
                    userId: result.insertId,
                    userType: 'Postal Clerk'
                },
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );

            // Return success response
            return res.status(201).json({
                success: true,
                message: "Postal Clerk registered successfully",
                token,
                user: {
                    id: result.insertId,
                    full_name,
                    email,
                    userType: 'Postal Clerk'
                }
            });

        } catch (error) {
            console.error("Registration error:", error);
            return res.status(500).json({
                success: false,
                error: "Internal server error"
            });
        }
    },

    async loginUser(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false,
                errors: errors.array() 
            });
        }

        const { email, password } = req.body;

        try {
            // Find user
            const [user] = await new Promise((resolve, reject) => {
                db.query(
                    "SELECT * FROM users WHERE email = ?",
                    [email],
                    (err, results) => {
                        if (err) reject(err);
                        resolve(results);
                    }
                );
            });

            if (!user) {
                return res.status(401).json({
                    success: false,
                    error: "Invalid credentials"
                });
            }

            // Verify password
            const isMatch = await bcrypt.compare(password, user.password_hash);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    error: "Invalid credentials"
                });
            }

            // Generate token
            const token = jwt.sign(
                {
                    userId: user.id,
                    userType: user.userType
                },
                process.env.JWT_SECRET,
                { expiresIn: '8h' }
            );

            // Prepare user data without sensitive information
            const userData = {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                userType: user.userType,
                address: user.address,
                phone_number: user.phone_number
            };

            return res.json({
                success: true,
                message: "Login successful",
                token,
                user: userData
            });

        } catch (error) {
            console.error("Login error:", error);
            return res.status(500).json({
                success: false,
                error: "Internal server error"
            });
        }
    }
};

export default authController;