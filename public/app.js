// public/app.js

async function registerUser() {
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;

    try {
        const response = await fetch("http://localhost:3000/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.status === 201) {
            document.getElementById("reg-error").innerText = "Registration successful!";
        } else {
            document.getElementById("reg-error").innerText = data.error || "Registration failed.";
        }
    } catch (error) {
        console.error("Error during registration:", error);
    }
}

async function loginUser() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.status === 200) {
            document.getElementById("login-error").innerText = "Login successful!";
        } else {
            document.getElementById("login-error").innerText = data.error || "Login failed.";
        }
    } catch (error) {
        console.error("Error during login:", error);
    }
}
