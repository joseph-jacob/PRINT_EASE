import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js'
import { getFirestore, addDoc, collection} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js'
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
document.getElementById("login").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission
  var email = document.getElementById("emailLogin").value;
  var password = document.getElementById("passwordLogin").value;
  if (!validateEmail(email)) {
    return;
  }
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in successfully
      const user = userCredential.user;
      console.log(user);
      //alert(user.email + " Login successful!");
      // Redirect to the desired page
      //window.location.href = "./student/index.html";
      if(user.uid=='5w3QtqWjjSOazqmwX7teQEEPB6k2'){
        window.location.href = "./staff/index.html";
      }
      else{
        window.location.href = "./student/index.html";
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      alert(errorMessage);
    });
});
// For new registration
document.getElementById("register").addEventListener("click", async function (event) {
  event.preventDefault(); // Prevent form submission
  var email = document.getElementById("emailRegister").value;
  var password1 = document.getElementById("password1Register").value;
  var name = document.getElementById("nameRegister").value;
  var department = document.getElementById("departmentRegister").value;
  var phno = document.getElementById("phnoRegister").value;
  var password2 = document.getElementById("password2Register").value;
  if (!validateEmail(email)) {
    return;
  }
  if (!validatePassword(password1, password2)) {
    return; // Prevent form submission
  }
  createUserWithEmailAndPassword(auth, email, password1)
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      alert("Registration successfully!!");
      try {
        const collectionRef = collection(db, "user");
        const docRef = await addDoc(collectionRef, {
          UserId: user.uid,
          Name: name,
          Phno: phno,
          Dept: department
        });
        console.log("Document written with ID: ", docRef.id);
        //alert("Form submitted");
        location.reload();
      } catch (error) {
        console.error(error);
        alert("Error adding document");
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      console.log(errorMessage);
      alert(error);

    });

  // Additional validation or form submission logic can be added here
});
document.getElementById("forget").addEventListener("click", function (event) {
  event.preventDefault();
  var email = document.getElementById("emailForget").value;
  if (!validateEmail(email)) {
    return;
  }
  // Send password reset email
  sendPasswordResetEmail(auth, email)
    .then(() => {
      alert("Password reset email sent!");
    })
    .catch((error) => {
      alert("Error sending password reset email:", error);
    });

});


function validateEmail(email) {
  var requiredString = "sjcetpalai.ac.in";
  if (email.endsWith(requiredString)) {
    return true; // Email ends with the required string
  } else {
    alert("Invalid email. Please enter a valid college email.");
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