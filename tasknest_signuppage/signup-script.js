// Get form and input elements
const signupForm = document.getElementById('signupForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Get error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Validation functions
function validateName(name) {
    // Name should be at least 2 characters and contain only letters and spaces
    function isValidName(name) {
        if (name.length < 2) {
            return false;
        }

        for (let i = 0; i < name.length; i++) {
            let char = name[i];

            if (
                char !== " " &&
                (char < "A" || char > "Z") &&
                (char < "a" || char > "z")
            ) {
                return false;
            }
        }

        return true;
    }


    if (name.trim() === '') {
        return { valid: false, message: 'Name is required' };
    }

    if (name.trim().length < 2) {
        return { valid: false, message: 'Name must be at least 2 characters long' };
    }

    if (!isValidName(name)) {
        return { valid: false, message: 'Name should contain only letters and spaces' };
    }

    return { valid: true, message: '' };
}

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

    if (!isValidEmail(email)) {
        return { valid: false, message: 'Please enter a valid email address' };
    }

    return { valid: true, message: '' };
}

function validatePassword(password) {
    if (password === '') {
        return { valid: false, message: 'Password is required' };
    }

    if (password.length < 8) {
        return { valid: false, message: 'Password must be at least 8 characters long' };
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }

    // Check for at least one number
    if (!/[0-9]/.test(password)) {
        return { valid: false, message: 'Password must contain at least one number' };
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
nameInput.addEventListener('blur', () => {
    const validation = validateName(nameInput.value);
    if (!validation.valid) {
        showError(nameInput, nameError, validation.message);
    } else {
        showSuccess(nameInput, nameError);
    }
});

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
nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('error')) {
        nameInput.classList.remove('error');
        nameError.textContent = '';
    }
});

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

// Form submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Validate all fields
    const nameValidation = validateName(nameInput.value);
    const emailValidation = validateEmail(emailInput.value);
    const passwordValidation = validatePassword(passwordInput.value);

    let isValid = true;

    // Check name
    if (!nameValidation.valid) {
        showError(nameInput, nameError, nameValidation.message);
        isValid = false;
    } else {
        showSuccess(nameInput, nameError);
    }

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

    // If all validations pass
    if (isValid) {
        // Store user data (in a real app, this would be sent to a server)
        const userData = {
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            password: passwordInput.value // In production, never store passwords in plain text!
        };

        // Store in localStorage (for demo purposes only)
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isLoggedIn', 'true');

        // Show success message
        alert('Account created successfully! Redirecting to dashboard...');

        // Redirect to manager page
        window.location.href = '../tasknest_manager/manager.html';
    }
});
