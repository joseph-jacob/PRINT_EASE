function changeToSignUp(event) {
    event.preventDefault(); // Prevent default behavior of the link

    var signinForm = document.getElementById("signin");
    var signupForm = document.getElementById("signup");

    if (signinForm && signupForm) {
        signinForm.style.display = "none";
        signupForm.style.display = "block";
    }
}

function changeToSignIn(event) {
    event.preventDefault(); // Prevent default behavior of the link

    var signinForm = document.getElementById("signin");
    var signupForm = document.getElementById("signup");

    if (signinForm && signupForm) {
        signinForm.style.display = "block";
        signupForm.style.display = "none";
    }
}

function validateSignUp() {
    var email = document.getElementById("email").value;
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;

    if (!validateEmail(email)) {
        return false; // Prevent form submission
    }

    if (!validatePassword(password1, password2)) {
        return false; // Prevent form submission
    }

    // Additional validation or form submission logic can be added here

    return true; // Allow form submission
}

function validateEmail(email) {
    var requiredString = ".sjcetpalai.ac.in";
    if (email.endsWith(requiredString)) {
        return true; // Email ends with the required string
    } else {
        alert("Invalid email. Please enter college mail id");
        return false; // Email does not end with the required string
    }
}

function validatePassword(password1, password2) {
    if (password1 === password2) {
        return true; // Passwords match
    } else {
        alert("Password does not match the confirmation.");
        return false; // Passwords do not match
    }
}




