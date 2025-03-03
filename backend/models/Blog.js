const db = require('../config/db');
const Blog = {
    create: (userId, title, content, coverImage, callback) => {
        db.query('INSERT INTO blogs (authorId, title, content, coverImage, likes, created_at) VALUES (?, ?, ?, ?, 0, NOW())',
            [userId, title, content, coverImage], callback);
    },
    getAll: (callback) => {
        db.query('SELECT *, users.name AS authorName FROM blogs JOIN users ON blogs.authorId = users.id;', callback);
    },
    getByUser: (userId, callback) => {
        db.query('SELECT * FROM blogs WHERE authorId = ?', [userId], callback);
    },
    getById: (blogId, callback) => {
        db.query('SELECT *, users.name AS authorName FROM blogs JOIN users ON blogs.authorId = users.id WHERE blogs.id = ?;', 
        [blogId], callback);
    }
};


module.exports = Blog;