// Authentication functionality
document.addEventListener('DOMContentLoaded', function() {
  // Login form validation
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      // Email validation
      const email = document.getElementById('email');
      const emailError = document.getElementById('emailError');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!email.value.trim()) {
        showError(email, emailError, 'Email is required');
        isValid = false;
      } else if (!emailRegex.test(email.value.trim())) {
        showError(email, emailError, 'Please enter a valid email address');
        isValid = false;
      } else {
        clearError(email, emailError);
      }
      
      // Password validation
      const password = document.getElementById('password');
      const passwordError = document.getElementById('passwordError');
      
      if (!password.value.trim()) {
        showError(password, passwordError, 'Password is required');
        isValid = false;
      } else if (password.value.length < 8) {
        showError(password, passwordError, 'Password must be at least 8 characters long');
        isValid = false;
      } else {
        clearError(password, passwordError);
      }
      
      // If form is valid, proceed with login
      if (isValid) {
        // Simulate successful login for demo purposes
        // In a real application, this would make an API call to authenticate
        simulateSuccessfulLogin();
      }
    });
  }
  
  // Sign up form validation
  const signinForm = document.getElementById('signinForm');
  if (signinForm) {
    signinForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      let isValid = true;
      
      // Full name validation
      const fullName = document.getElementById('fullName');
      const nameError = document.getElementById('nameError');
      
      if (!fullName.value.trim()) {
        showError(fullName, nameError, 'Full name is required');
        isValid = false;
      } else {
        clearError(fullName, nameError);
      }
      
      // Email validation
      const email = document.getElementById('email');
      const emailError = document.getElementById('emailError');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (!email.value.trim()) {
        showError(email, emailError, 'Email is required');
        isValid = false;
      } else if (!emailRegex.test(email.value.trim())) {
        showError(email, emailError, 'Please enter a valid email address');
        isValid = false;
      } else {
        clearError(email, emailError);
      }
      
      // Phone validation
      const phone = document.getElementById('phone');
      const phoneError = document.getElementById('phoneError');
      const phoneRegex = /^\d{10}$/;
      
      if (!phone.value.trim()) {
        showError(phone, phoneError, 'Phone number is required');
        isValid = false;
      } else if (!phoneRegex.test(phone.value.replace(/\D/g, ''))) {
        showError(phone, phoneError, 'Please enter a valid 10-digit phone number');
        isValid = false;
      } else {
        clearError(phone, phoneError);
      }
      
      // Password validation
      const password = document.getElementById('password');
      const passwordError = document.getElementById('passwordError');
      
      if (!password.value.trim()) {
        showError(password, passwordError, 'Password is required');
        isValid = false;
      } else if (password.value.length < 8) {
        showError(password, passwordError, 'Password must be at least 8 characters long');
        isValid = false;
      } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/.test(password.value)) {
        showError(password, passwordError, 'Password must contain at least one uppercase letter, one lowercase letter, and one number');
        isValid = false;
      } else {
        clearError(password, passwordError);
      }
      
      // Confirm password validation
      const confirmPassword = document.getElementById('confirmPassword');
      const confirmPasswordError = document.getElementById('confirmPasswordError');
      
      if (!confirmPassword.value.trim()) {
        showError(confirmPassword, confirmPasswordError, 'Please confirm your password');
        isValid = false;
      } else if (confirmPassword.value !== password.value) {
        showError(confirmPassword, confirmPasswordError, 'Passwords do not match');
        isValid = false;
      } else {
        clearError(confirmPassword, confirmPasswordError);
      }
      
      // If form is valid, proceed with sign up
      if (isValid) {
        // Simulate successful registration for demo purposes
        // In a real application, this would make an API call to register the user
        simulateSuccessfulSignup();
      }
    });
  }
  
  // Helper functions for form validation
  function showError(inputElement, errorElement, message) {
    inputElement.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('visible');
  }
  
  function clearError(inputElement, errorElement) {
    inputElement.classList.remove('error');
    errorElement.textContent = '';
    errorElement.classList.remove('visible');
  }
  
  // Simulate successful login
  function simulateSuccessfulLogin() {
    // Display loading state
    const loginButton = loginForm.querySelector('button[type="submit"]');
    const originalText = loginButton.textContent;
    loginButton.textContent = 'Logging in...';
    loginButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
      // Store user login state in localStorage (for demo purposes)
      localStorage.setItem('yumcartLoggedIn', 'true');
      
      // Redirect to home page
      window.location.href = 'index.html';
    }, 1500);
  }
  
  // Simulate successful sign up
  function simulateSuccessfulSignup() {
    // Display loading state
    const signupButton = signinForm.querySelector('button[type="submit"]');
    const originalText = signupButton.textContent;
    signupButton.textContent = 'Creating Account...';
    signupButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
      // Store user registration state in localStorage (for demo purposes)
      localStorage.setItem('yumcartLoggedIn', 'true');
      
      // Redirect to home page
      window.location.href = 'index.html';
    }, 1500);
  }
});