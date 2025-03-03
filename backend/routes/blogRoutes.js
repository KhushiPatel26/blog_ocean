const express = require('express');
const Blog = require('../models/Blog');
const db = require('../config/db');
const multer = require('multer');
const router = express.Router();

// Multer Storage Setup (for Image Uploads)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Ensure "uploads/" folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// Create a new blog post
router.post('/create_blog', upload.single('coverImage'), (req, res) => {
    if (!req.session.user) return res.status(401).send('Unauthorized');

    const { title, content } = req.body;
    const coverImage = req.file ? req.file.filename : null; // Store uploaded file name

    if (!title || !content || !coverImage) {
        return res.status(400).send('All fields are required');
    }

    Blog.create(req.session.user.id, title, content, coverImage, (err) => {
        if (err) return res.status(500).send('Error creating blog');
        res.redirect('/articles'); // Redirect to articles after successful creation
    });
});

router.get('/all', (req, res) => {
    Blog.getAll((err, results) => {
        if (err) return res.status(500).send('Error fetching blogs');
        res.json(results);
    });
});

router.get('/my', (req, res) => {
    if (!req.session.user) return res.status(401).send('Unauthorized');
    Blog.getByUser(req.session.user.id, (err, results) => {
        if (err) return res.status(500).send('Error fetching blogs');
        res.json(results);
    });
});

router.get('/:id', (req, res) => {
    const blogId = req.params.id;
    Blog.getById(blogId, (err, result) => {
        if (err) return res.status(500).send('Error fetching blog');
        if (!result || result.length === 0) return res.status(404).send('Blog not found'); // Add this line
        res.json(result[0]); // Fix: Ensure only one blog is returned
    });
});

module.exports = router;