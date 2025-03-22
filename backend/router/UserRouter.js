//router/UserRouter.js

import express from "express";
import authController from "../controller/authController.js";
import { check } from "express-validator";

const UserRouter = express.Router();

UserRouter.post(
    "/register",
    [
        check("full_name", "Full name is required").not().isEmpty(), // Change "username" to "full_name"
        check("email", "Valid email is required").isEmail(),
        check("password", "Password must be at least 6 characters").isLength({ min: 6 }),
        check("address", "Address is required").not().isEmpty(),
        check("phone_number", "Phone number is required").not().isEmpty(), // Change "phone" to "phone_number"
    ],
    authController.registerUser
);

UserRouter.post(
    "/login",
    [
        check("email", "Valid email is required").isEmail(),
        check("password", "Password is required").not().isEmpty(),
    ],
    authController.loginUser
);

export default UserRouter;
