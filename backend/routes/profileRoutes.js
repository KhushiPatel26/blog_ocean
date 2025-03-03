const express = require('express');
const db = require('../config/db');
const User = require('../models/User');
const router = express.Router();

router.get('/profile', (req, res) => {
    const userId = req.user.id;
    User.getById(userId, (err, result) => {
        if (err) return res.status(500).send('Error fetching user information');
        if (!result || result.length === 0) return res.status(404).send('User not found'); // Add this line
        res.json(result[0]); // Fix: Ensure only one blog is returned
    });
});
// router.get("/profile", isAuthenticated, async (req, res) => {
//     try {
//         const userId = req.user.id;
//         const user = await db.query("SELECT name, email, phone, dob FROM users WHERE id = ?", [userId]);

//         if (user.length === 0) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         res.json(user[0]);
//     } catch (error) {
//         console.error("Error fetching user profile:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

module.exports = router;