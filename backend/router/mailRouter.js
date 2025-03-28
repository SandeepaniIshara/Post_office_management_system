import express from "express";
import mailController from "../controller/mailController.js";

const router = express.Router();

// Add a new mail
router.post("/", mailController.addMail);

// Get all mails
router.get("/", mailController.getAllMails);

// Get a mail by ID
router.get("/:id", mailController.getMailById);

// Update a mail
router.put("/:id", mailController.updateMail);

// Delete a mail
router.delete("/:id", mailController.deleteMail);

export default router;