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

function validateSignIn() {
    var email = document.getElementById("emailSignIn").value;
    if (!validateEmail(email)) {
        return false;
    }
    return true;
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






import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-analytics.js";
import { getFirestore, addDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js'
const firebaseConfig = {
  apiKey: "AIzaSyBT1jTxSYBFNwq9eFA7X5egl8NPaNeF1d0",
  authDomain: "miniproject-599c9.firebaseapp.com",
  projectId: "miniproject-599c9",
  storageBucket: "miniproject-599c9.appspot.com",
  messagingSenderId: "408288219519",
  appId: "1:408288219519:web:0cef4bbae96354f30c4a4a",
  measurementId: "G-5E0GSXFY3K"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
document.getElementById("signUpButton").onclick = async function (e) {
    e.preventDefault()
    const docRef = await addDoc(collection(db, "data"), {
        Name: document.getElementById('name').value,
        Email: document.getElementById('email').value
    });
    console.log("Document written with ID: ", docRef.id);
    alert("Form submitted")
    location.reload()
};






