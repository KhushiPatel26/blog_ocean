import { config } from '../backend/config/config.js'; 

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const response = await fetch(`${config.HOST}:${config.PORT}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });

            const result = await response.text();
            alert(result);
            if (response.ok) window.location.href = "profile.html";
        });
    }

    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const phone = document.getElementById("phone").value;
            const dob = document.getElementById("dob").value;

            const response = await fetch(`${config.HOST}:${config.PORT}/auth/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password, phone, dob }),
            });

            const result = await response.text();
            alert(result);
            if (response.ok) window.location.href = "login.html";
        });
    }
});

async function logout() {
    await fetch("${config.HOST}:${config.PORT}/auth/logout", { credentials: "include" });
    alert("Logged out!");
    window.location.href = "login.html";
}
