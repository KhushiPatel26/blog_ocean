const db = require('../config/db');
const User = {
    create: (name, email, password, phone, dob, callback) => {
        db.query('INSERT INTO users (name, email, password, phone, dob, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
            [name, email, password, phone, dob], callback);
    },
    findByEmail: (email, callback) => {
        db.query('SELECT * FROM users WHERE email = ?', [email], callback);
    },
    updateUser: (id, name, phone, dob, callback) => {
        db.query('UPDATE users SET name = ?, phone = ?, dob = ? WHERE id = ?',
            [name, phone, dob, id], callback);
    },
    getById: (userId, callback) => {
        db.query("SELECT name, email, phone, dob FROM users WHERE id = ?",
        [userId], callback);
    }
};
module.exports = User;