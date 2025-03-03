document.addEventListener("DOMContentLoaded", async () => {
    const blogsContainer = document.getElementById("blogsContainer");

    if (blogsContainer) {
        const response = await fetch("http://localhost:5000/blogs/all");
        const blogs = await response.json();

        blogsContainer.innerHTML = blogs.map(blog => `
            <div class="blog-card">
                <h3>${blog.title}</h3>
                <p>${blog.content.substring(0, 100)}...</p>
                <button onclick="viewBlog(${blog.id})">Read More</button>
            </div>
        `).join("");
    }
});

async function createBlog() {
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;

    const response = await fetch("http://localhost:5000/blogs/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
        credentials: "include",
    });

    const result = await response.text();
    alert(result);
    if (response.ok) window.location.reload();
}

function viewBlog(blogId) {
    window.location.href = `blog.html?id=${blogId}`;
}
