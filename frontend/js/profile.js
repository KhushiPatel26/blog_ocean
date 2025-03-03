document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("http://localhost:5000/users/profile", { credentials: "include" });

        if (!response.ok) {
            alert("Please log in first!");
            window.location.href = "login.html";
            return;
        }

        const user = await response.json();

        // Update the profile details in the correct section
        document.querySelector(".profile-info").innerHTML = `
            <h2>Personal Info</h2>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone || "Not set"}</p>
            <p><strong>DOB:</strong> ${user.dob || "Not set"}</p>
            <div class="action-buttons">
                <a href="#" class="btn">Edit Profile</a>
                <a href="#" class="btn danger-btn delete-account">Delete Account</a>
            </div>
        `;
    } catch (error) {
        console.error("Error fetching profile data:", error);
    }
});
