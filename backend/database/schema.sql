DROP DATABASE IF EXISTS blog_ocean;
CREATE DATABASE blog_ocean;
USE blog_ocean;

-- Drop existing tables if they exist
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS blogs;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS saved_blogs;

-- Users table
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    dob DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Blogs table
CREATE TABLE blogs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    authorId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    coverImage VARCHAR(255) NOT NULL,
    likes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (authorId) REFERENCES users(id) ON DELETE CASCADE
);

-- Comments table
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    blogId INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (blogId) REFERENCES blogs(id) ON DELETE CASCADE
);


-- Saved Blogs table (no timestamps as requested)
CREATE TABLE saved_blogs (
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    userId INTEGER,
    blogId INTEGER,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (blogId) REFERENCES blogs(id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password, phone, dob) 
VALUES 
('John Doe', 'john@example.com', 'hashed_password_1', '1234567890', '1990-05-15'),
('Jane Smith', 'jane@example.com', 'hashed_password_2', '0987654321', '1995-08-22'),
('Alice Johnson', 'alice@example.com', 'hashed_password_3', '1122334455', '1988-03-10');


INSERT INTO blogs (title, content, coverImage, authorId) 
VALUES 
('First Blog Post', 'This is the content of the first blog.', 'image1.jpg', 1),
('Tech Trends 2025', 'Exploring the future of technology.', 'tech.jpg', 2),
('Healthy Living', 'Tips for a healthier lifestyle.', 'health.jpg', 3);


INSERT INTO comments (userId, blogId, content) 
VALUES 
(1, 2, 'Great article!'),
(1, 1, 'Very informative, thanks for sharing!'),
(2, 3, 'Looking forward to the tech trends.');


INSERT INTO saved_blogs (userId, blogId) 
VALUES 
(1, 2),
(2, 3),
(3, 1);
