import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js'
import { getAuth, signOut ,sendPasswordResetEmail} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js'
import { getFirestore, query,where, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js'
import { getStorage, ref, uploadBytes } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js'
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
const storage = getStorage(app);

auth.onAuthStateChanged(async function (user) {
    if (user) {
      const collectionRef = collection(db, 'user');
      const q = query(collectionRef, where('UserId', '==', user.uid));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        querySnapshot.forEach((docSnapshot) => {
          var userData = docSnapshot.data();
  
          // Populate the HTML elements with the retrieved data
          //document.getElementById("profile-photo").src ="https://img.icons8.com/bubbles/100/000000/user.png";
          document.getElementById("name").textContent = userData.Name;
          document.getElementById("email").textContent = user.email;
          document.getElementById("department").textContent = userData.Dept;
          document.getElementById("mobile").textContent = userData.Phno;
        });
      } else {
        console.log("User not found");
      }
    } else {
      window.location.href = "../index.html";
    }
    document.getElementById("resetPassword").addEventListener("click", function (event) {
      event.preventDefault();
      var email = user.email;
      // Send password reset email
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Password reset email sent!");
        })
        .catch((error) => {
          alert("Error sending password reset email:", error);
        });
    
    });
  });