const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/profile', (req, res) => {
    if (!req.session.user) return res.status(401).send('Unauthorized');
    res.json(req.session.user);
});

router.put('/update', (req, res) => {
    if (!req.session.user) return res.status(401).send('Unauthorized');
    const { name, phone, dob } = req.body;
    User.updateUser(req.session.user.id, name, phone, dob, (err) => {
        if (err) return res.status(500).send('Error updating user');
        res.send('User updated');
    });
});

module.exports = router;
