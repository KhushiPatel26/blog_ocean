const express = require('express');
const Blog = require('../models/Blog');
const db = require('../config/db');
const router = express.Router();

router.get('/', (req, res) => {
    Blog.getAll((err, results) => {
        if (err) return res.status(500).send('Error fetching blogs');
        res.json(results);
    });
});

module.exports = router;