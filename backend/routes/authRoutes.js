const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/check-session', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

router.post('/signup', (req, res) => {
    const { name, email, password, phone, dob } = req.body;
    User.create(name, email, password, phone, dob, (err) => {
        if (err) return res.status(500).send('Error creating user');
        res.status(201).send('User registered');
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email, (err, results) => {
        if (err || results.length === 0) return res.status(400).send('User not found');
        if (password !== results[0].password) return res.status(400).send('Incorrect password');
        req.session.user = results[0];
        res.send('Login successful');
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.send('Logged out');
    });
});

module.exports = router;