const config = require('./config/config');
const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./config/db');

const app = express();

// ✅ Middleware (Should be placed BEFORE defining routes)
app.use(cors());
app.use(bodyParser.json());
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

// ✅ Serve static files from "frontend"
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Serve uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// ✅ Set view engine for server-side rendering
app.set('views', path.join(__dirname, '../frontend'));
app.set('view engine', 'ejs');

// ✅ Middleware to check authentication
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
}

// ✅ Import Routes (Uncommented correctly)
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const blogallRoutes = require('./routes/blogallRoutes');
const profileRoutes = require('./routes/profileRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes'); 


// ✅ Protect routes that require authentication
app.use('/profile', isAuthenticated, profileRoutes);
app.use('/create_blog', isAuthenticated, blogRoutes);
app.use('/blogs', isAuthenticated, blogRoutes);

// ✅ Public Routes
app.use('/auth', authRoutes);
app.use('/comments', commentRoutes);
app.use('/users', userRoutes);
app.use('/', blogallRoutes);

// ✅ Serve frontend pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'login.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'signup.html'));
});

// ✅ Only allow authenticated users to access profile, create-blog, and articles
app.get('/profile', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'profile.html'));
});

app.get('/create_blog', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'create-blog.html'));
});

app.get('/articles', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'articles.html'));
});

// ✅ Fetch all blogs
app.get('/blogs/all', isAuthenticated, (req, res) => {
    const query = 'SELECT * FROM blogs ORDER BY created_at DESC';

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);
        }
    });
});

app.get('/allblogs',  (req, res) => {
    const query = 'SELECT * FROM blogs ORDER BY created_at DESC';

    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Database error' });
        } else {
            res.json(results);
        }
    });
});

// ✅ Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const SERVER_URL = `${config.HOST}:${config.PORT}`;
console.log(`Server running at ${SERVER_URL}`);

app.listen(config.PORT, () => {
    console.log(`Server is running on ${SERVER_URL}`);
});