import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail,} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js'
import { getFirestore, addDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js'
const firebaseConfig = {
    apiKey: "AIzaSyBCtvK5bUFqSRGWYTVXnNLHsSdSMMfyEdQ",
    authDomain: "printease-875ad.firebaseapp.com",
    projectId: "printease-875ad",
    storageBucket: "printease-875ad.appspot.com",
    messagingSenderId: "903339769147",
    appId: "1:903339769147:web:cd509e3189d24e59ad8b1e",
    measurementId: "G-L1DX6GPNRG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();
const db = getFirestore();
console.log(app)

document.getElementById("register").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // For new registration
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            alert("Registration successfully!!");
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log(errorMessage);
            alert(error);
        });
});


document.getElementById("login").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user);
            alert(user.email + " Login successfully!!!");
            document.getElementById('logout').style.display = 'block';
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            alert(errorMessage);
        });
});

document.getElementById("logout").addEventListener("click", function (event) {
    event.preventDefault();
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('Sign-out successful.');
        alert('Sign-out successful.');
        document.getElementById('logout').style.display = 'none';
    }).catch((error) => {
        // An error happened.
        console.log('An error happened.');
    });
});

document.getElementById("forget").addEventListener("click", function (event) {
    event.preventDefault();
    var email = document.getElementById("email").value;

    // Send password reset email
    sendPasswordResetEmail(auth,email)
        .then(() => {
            console.log("Password reset email sent!");
        })
        .catch((error) => {
            console.log("Error sending password reset email:", error);
        });

});


document.getElementById("add").addEventListener("click", async function (event) {
    event.preventDefault();
    try {
        const collectionRef = collection(db, "data");
        const docRef = await addDoc(collectionRef, {
            Name: document.getElementById('addName').value,
            Phno: document.getElementById('addNumber').value
        });
        console.log("Document written with ID: ", docRef.id);
        alert("Form submitted");
        location.reload();
    } catch (error) {
        console.error(error);
        alert("Error adding document");
    }
});

window.onload = async function () {
    const querySnapshot = await getDocs(collection(db, "data"));
    querySnapshot.forEach((doc) => {
        const row = document.getElementById("tbody").insertRow(0);
        row.insertCell(0).innerHTML = doc.data().Name
        row.insertCell(1).innerHTML = doc.data().Phno
    });
}

//forget password
// Function to handle password reset
