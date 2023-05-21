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
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

// Write data to Firebase
function writeData() {
  var name = document.getElementById('name').value;
  var department = document.getElementById('department').value;
  var email = document.getElementById('email').value;

  var data = {
    name: name,
    department: department,
    email: email
  };

  // Generate a new key for the data
  var newKey = firebase.database().ref().child('users').push().key;

  // Create a new data object with the generated key
  var updates = {};
  updates['/users/' + newKey] = data;

  // Write the data to Firebase
  alert("User is saved")
  return firebase.database().ref().update(updates);
}
