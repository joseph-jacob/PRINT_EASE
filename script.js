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

