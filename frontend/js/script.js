console.log("script.js is loaded!");

document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path === '/' || path === '/articles' ||  path.includes('index.html') || path.includes('articles.html')) {
        fetchBlogs();
    }
    if (/\/blogs\/\d+/.test(path) || path.includes('view-blog.html')) {
        fetchBlogDetails();
    }

    const commentForm = document.querySelector('.comment-form');

    if (commentForm) {
        commentForm.addEventListener('submit', function (event) {
            event.preventDefault();
            
            const urlParams = new URLSearchParams(window.location.search);
            const blogId = urlParams.get('id');
            const commentText = this.querySelector('textarea[name="comment"]').value;

            fetch('http://localhost:5000/comments/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ blogId, comment: commentText })
            })
            .then(response => {
                if (!response.ok) throw new Error('Failed to add comment');
                return response.text();
            })
            .then(() => {
                this.reset();
                fetchComments(blogId); // Reload comments
            })
            .catch(error => console.error('Error submitting comment:', error));
        });
    }

});


function checkAuth() {
    fetch('http://localhost:5000/auth/check-session')
        .then(response => response.json())
        .then(data => {
            if (!data.loggedIn) {
                window.location.href = 'sign-in.html'; // Redirect to login page if not authenticated
            }
        })
        .catch(error => console.error('Error checking session:', error));
}

function fetchBlogs() {
    fetch('http://localhost:5000/allblogs')
        .then(response => response.json())
        .then(blogs => {
            const blogContainer = document.querySelector('.grid-container');
            blogContainer.innerHTML = ''; // Clear existing static content
            blogs.forEach(blog => {
                const blogCard = document.createElement('div');
                blogCard.classList.add('card');
                blogCard.innerHTML = `
                    <h3>${blog.title}</h3>
                    <div class="meta">Posted by: ${blog.authorName} | ${new Date(blog.created_at).toLocaleDateString()}</div>
                    <p>${blog.content.substring(0, 100)}...</p>
                    <a href="view-blog.html?id=${blog.id}" class="btn">Read More</a>
                `;
                blogContainer.appendChild(blogCard);
            });
        })
        .catch(error => console.error('Error fetching blogs:', error));
}

function fetchBlogDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const blogId = urlParams.get('id');

    if (!blogId) {
        document.querySelector('.blog-post').innerHTML = '<p>Blog not found.</p>';
        return;
    }

    fetch(`http://localhost:5000/blogs/${blogId}`)
        .then(response => response.json())
        .then(blog => {
            document.querySelector('.post-title').textContent = blog.title;
            document.querySelector('.post-meta').textContent = `Posted by: ${blog.authorName} | ${new Date(blog.created_at).toLocaleDateString()}`;
            document.querySelector('.post-content').innerHTML = `<p>${blog.content.replace(/\n/g, '</p><p>')}</p>`;

            if (blog.coverImage) {
                document.querySelector('.cover-image img').src = blog.coverImage;
                document.querySelector('.cover-image img').alt = blog.title;
            } else {
                document.querySelector('.cover-image').style.display = 'none';
            }
            fetchComments(blogId);
        })
        .catch(error => {
            console.error('Error fetching blog details:', error);
            document.querySelector('.blog-post').innerHTML = '<p>Failed to load blog.</p>';
        });
}

function fetchComments(blogId) {
    fetch(`http://localhost:5000/comments/${blogId}`)
        .then(response => response.json())
        .then(comments => {
            const commentsList = document.querySelector('.comments-list');
            commentsList.innerHTML = ''; // Clear existing comments

            if (comments.length === 0) {
                commentsList.innerHTML = '<p>No comments yet. Be the first to comment!</p>';
                return;
            }

            comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                commentDiv.innerHTML = `
                    <div class="meta"><strong>${comment.authorName}</strong> | ${new Date(comment.created_at).toLocaleDateString()}</div>
                    <p>${comment.content}</p>
                `;
                commentsList.appendChild(commentDiv);
            });
        })
        .catch(error => console.error('Error fetching comments:', error));
}