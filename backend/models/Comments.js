const db = require('../config/db');

const Comment = {
    create: (userId, blogId, content, callback) => {
        db.query(
            'INSERT INTO comments (userId, blogId, content, created_at) VALUES (?, ?, ?, NOW())',
            [userId, blogId, content],
            callback
        );
    },
    getByBlog: (blogId, callback) => {
        db.query(
            'SELECT comments.*, users.name AS authorName FROM comments JOIN users ON comments.userId = users.id WHERE blogId = ? ORDER BY comments.created_at DESC',
            [blogId],
            callback
        );
    }
};

module.exports = Comment;
