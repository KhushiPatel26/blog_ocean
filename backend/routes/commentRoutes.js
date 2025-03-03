const express = require('express');
const Comment = require('../models/Comments');
const router = express.Router();

// Retrieve comments for a blog post
router.get('/:blogId', (req, res) => {
    const blogId = req.params.blogId;
    console.log("Fetching comments for blogId:", blogId);

    Comment.getByBlog(blogId, (err, results) => {
        if (err) {
            console.error("Error fetching comments:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
        res.json(results);
    });
});

// Add a new comment
router.post('/add', (req, res) => {
    if (!req.session.user) return res.status(401).send('Unauthorized');
    
    const { blogId, comment } = req.body;
    Comment.create(req.session.user.id, blogId, comment, (err) => {
        if (err) return res.status(500).send('Error adding comment');
        res.send('Comment added');
    });
});

module.exports = router;
