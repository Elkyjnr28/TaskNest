// Get form and input elements
const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Get error message elements
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Validation functions
function validateEmail(email) {
    // Email regex pattern
    function isValidEmail(email) {
        if (email.includes(" ")) {
            return false;
        }

        if (!email.includes("@")) {
            return false;
        }

        let parts = email.split("@");

        if (parts.length !== 2) {
            return false;
        }

        let beforeAt = parts[0];
        let afterAt = parts[1];

        if (beforeAt.length === 0) {
            return false;
        }

        if (!afterAt.includes(".")) {
            return false;
        }

        let dotParts = afterAt.split(".");

        if (dotParts[0].length === 0 || dotParts[1].length === 0) {
            return false;
        }

        return true;
    }


    if (email.trim() === '') {
        return { valid: false, message: 'Email is required' };
    }

    if (!isValidEmail(email.trim())) {
        return { valid: false, message: 'Please enter a valid email address' };
    }

    return { valid: true, message: '' };
}

function validatePassword(password) {
    if (password === '') {
        return { valid: false, message: 'Password is required' };
    }

    if (password.length < 6) {
        return { valid: false, message: 'Password must be at least 6 characters long' };
    }

    return { valid: true, message: '' };
}

// Show error message
function showError(input, errorElement, message) {
    input.classList.add('error');
    input.classList.remove('success');
    errorElement.textContent = message;
}

// Show success
function showSuccess(input, errorElement) {
    input.classList.remove('error');
    input.classList.add('success');
    errorElement.textContent = '';
}

// Real-time validation on blur
emailInput.addEventListener('blur', () => {
    const validation = validateEmail(emailInput.value);
    if (!validation.valid) {
        showError(emailInput, emailError, validation.message);
    } else {
        showSuccess(emailInput, emailError);
    }
});

passwordInput.addEventListener('blur', () => {
    const validation = validatePassword(passwordInput.value);
    if (!validation.valid) {
        showError(passwordInput, passwordError, validation.message);
    } else {
        showSuccess(passwordInput, passwordError);
    }
});

// Clear error on input
emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('error')) {
        emailInput.classList.remove('error');
        emailError.textContent = '';
    }
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.classList.contains('error')) {
        passwordInput.classList.remove('error');
        passwordError.textContent = '';
    }
});

// Check credentials against stored data
function checkCredentials(email, password) {
    // Get stored user data
    const storedUserData = localStorage.getItem('userData');

    if (!storedUserData) {
        return { success: false, message: 'No account found. Please sign up first.' };
    }

    const userData = JSON.parse(storedUserData);

    // Check if email and password match
    if (userData.email === email && userData.password === password) {
        return { success: true, message: 'Login successful!' };
    } else {
        return { success: false, message: 'Invalid email or password' };
    }
}

// Form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const emailValidation = validateEmail(emailInput.value);
    const passwordValidation = validatePassword(passwordInput.value);

    let isValid = true;

    // Check email
    if (!emailValidation.valid) {
        showError(emailInput, emailError, emailValidation.message);
        isValid = false;
    } else {
        showSuccess(emailInput, emailError);
    }

    // Check password
    if (!passwordValidation.valid) {
        showError(passwordInput, passwordError, passwordValidation.message);
        isValid = false;
    } else {
        showSuccess(passwordInput, passwordError);
    }

    // If all validations pass, check credentials
    if (isValid) {
        const authResult = checkCredentials(
            emailInput.value.trim(),
            passwordInput.value
        );

        if (authResult.success) {
            // Set logged in status
            localStorage.setItem('isLoggedIn', 'true');

            // Show success message
            alert(authResult.message + ' Redirecting to dashboard...');

            // Redirect to manager page
            window.location.href = '../tasknest_manager/manager.html';
        } else {
            // Show error for invalid credentials
            showError(emailInput, emailError, authResult.message);
            showError(passwordInput, passwordError, '');

            // Also show alert for better user experience
            alert(authResult.message);
        }
    }
});