// Get navigation elements
const navLoggedOut = document.querySelector('.nav-logged-out');
const navLoggedIn = document.querySelector('.nav-logged-in');

// Get buttons
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        showLoggedInNav();
    } else {
        showLoggedOutNav();
    }
});

// Login button click handler
// loginBtn and signupBtn are now links, so we don't need JS handlers for them
// unless we want to intercept the click, but for now we let them navigate.

// Logout button click handler
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        handleLogout();
    });
}

// Function to handle login (This was a simulation, now handled by login page)
// Keeping it if needed for other logic, but main login is in login-script.js

// Function to handle logout
function handleLogout() {
    // Remove login state
    localStorage.removeItem('isLoggedIn');

    // Reload page to update UI
    window.location.reload();
}

// Function to show logged-in navigation
function showLoggedInNav() {
    navLoggedOut.style.display = 'none';
    navLoggedIn.style.display = 'flex';
}

// Function to show logged-out navigation
function showLoggedOutNav() {
    navLoggedOut.style.display = 'flex';
    navLoggedIn.style.display = 'none';
}

window.addEventListener("load", () => {
    const message = localStorage.getItem("alertMessage");

    if (message) {
        alert(message);
        localStorage.removeItem("alertMessage");
    }
})