const mysql = require('mysql2');
const connection = mysql.createConnection({
    // host: 'localhost',
    // user: 'root',
    // password: 'root',
    // database: 'blog_ocean'
    host: 'sql.freedb.tech',
    user: 'freedb_honeypot',
    password: 'qP?U#ujj6EbWnJs',
    database: 'freedb_blog_ocean'
});
connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});
module.exports = connection;