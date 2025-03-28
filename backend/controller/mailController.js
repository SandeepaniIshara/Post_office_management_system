import db from "../config/db.js";

const mailController = {
  // Add a new mail record
  async addMail(req, res) {
    const { mailId, type, sender, senderAddress, recipient, recipientAddress, status } = req.body;

    try {
      // Insert mail into the database
      const [result] = await new Promise((resolve, reject) => {
        db.query(
          `INSERT INTO mail_management 
          (mailId, type, sender, senderAddress, recipient, recipientAddress, status) 
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [mailId, type, sender, senderAddress, recipient, recipientAddress, status],
          (err, results) => {
            if (err) reject(err);
            resolve(results);
          }
        );
      });

      return res.status(201).json({
        success: true,
        message: "Mail added successfully",
        mail: {
          id: result.insertId,
          mailId,
          type,
          sender,
          senderAddress,
          recipient,
          recipientAddress,
          status,
        },
      });
    } catch (error) {
      console.error("Error adding mail:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },

  // Get all mail records
  async getAllMails(req, res) {
    try {
      const [mails] = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM mail_management", (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      });

      return res.json({
        success: true,
        mails,
      });
    } catch (error) {
      console.error("Error fetching mails:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },

  // Get a single mail record by ID
  async getMailById(req, res) {
    const { id } = req.params;

    try {
      const [mail] = await new Promise((resolve, reject) => {
        db.query("SELECT * FROM mail_management WHERE id = ?", [id], (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      });

      if (!mail) {
        return res.status(404).json({
          success: false,
          error: "Mail not found",
        });
      }

      return res.json({
        success: true,
        mail,
      });
    } catch (error) {
      console.error("Error fetching mail:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },

  // Update a mail record
  async updateMail(req, res) {
    const { id } = req.params;
    const { type, sender, senderAddress, recipient, recipientAddress, status } = req.body;

    try {
      const [result] = await new Promise((resolve, reject) => {
        db.query(
          `UPDATE mail_management 
          SET type = ?, sender = ?, senderAddress = ?, recipient = ?, recipientAddress = ?, status = ? 
          WHERE id = ?`,
          [type, sender, senderAddress, recipient, recipientAddress, status, id],
          (err, results) => {
            if (err) reject(err);
            resolve(results);
          }
        );
      });

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: "Mail not found",
        });
      }

      return res.json({
        success: true,
        message: "Mail updated successfully",
      });
    } catch (error) {
      console.error("Error updating mail:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },

  // Delete a mail record
  async deleteMail(req, res) {
    const { id } = req.params;

    try {
      const [result] = await new Promise((resolve, reject) => {
        db.query("DELETE FROM mail_management WHERE id = ?", [id], (err, results) => {
          if (err) reject(err);
          resolve(results);
        });
      });

      if (result.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          error: "Mail not found",
        });
      }

      return res.json({
        success: true,
        message: "Mail deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting mail:", error);
      return res.status(500).json({
        success: false,
        error: "Internal server error",
      });
    }
  },
};

export default mailController;