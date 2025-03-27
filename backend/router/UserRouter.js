import express from "express";
import authController from "../controller/authController.js";
import { check } from "express-validator";
import authMiddleware from "../middleware/authMiddleware.js";

const UserRouter = express.Router();

// Registration route
UserRouter.post(
    "/register",
    [
        check("full_name", "Full name is required").not().isEmpty(),
        check("email", "Valid email is required").isEmail(),
        check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
        check("address", "Address is required").not().isEmpty(),
        check("phone_number", "Valid phone number is required").isMobilePhone(),
    ],
    authController.registerUser
);

// Login route
UserRouter.post(
    "/login",
    [
        check("email", "Valid email is required").isEmail(),
        check("password", "Password is required").not().isEmpty(),
    ],
    authController.loginUser
);

// Protected user profile route (example)
UserRouter.get(
    "/profile",
    authMiddleware.authenticate,
    authMiddleware.authorize('Postal Clerk'),
    authController.getUserProfile
);

export default UserRouter;