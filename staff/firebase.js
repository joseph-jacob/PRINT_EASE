import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js'
import { getFirestore, collection, getDocs, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js'
import { getStorage, ref, getDownloadURL } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js';
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

console.log(app);

window.onload = async function () {
    let count = 1;
    const querySnapshot = await getDocs(collection(db, "data"));
    querySnapshot.forEach(async (doc) => {
      // Get the reference to the file in Firebase Storage
      const storageRef = ref(storage, doc.data().File);
      // Get the download URL for the file
      const querySnapshot = collection(db,"users").get();

querySnapshot.forEach((doc) => {
  // Get the document's name.
  const name = doc.data().name;

  // Do something with the name.
});


      // Check if the document exists
      if (userDocSnap.exists()) {
        // Access the 'name' field from the user document
        const userName = userDocSnap.data().name;
        console.log('User Name:', name);
      }
  
      console.log(userName);
      const downloadURL = await getDownloadURL(db.doc('users', userid));
      const row = document.getElementById("tbody").insertRow(0);
      row.insertCell(0).innerHTML = count;
      row.insertCell(1).innerHTML = doc.data().uid;
      row.insertCell(2).innerHTML = doc.data().FName;
      row.insertCell(3).innerHTML = doc.data().Fprice;
      row.insertCell(4).innerHTML = doc.data().Fmethod;
      row.insertCell(5).innerHTML = doc.data().Date;
      row.insertCell(6).innerHTML = doc.data().Fcount;
      row.insertCell(7).innerHTML = doc.data().Ftype;
      row.insertCell(8).innerHTML = doc.data().Fside;
      row.insertCell(9).innerHTML = `<audio src="${doc.data().audioUrl}" controls></audio>`; // Insert audio player with source URL
      row.insertCell(10).innerHTML = doc.data().status;
      row.insertCell(11).innerHTML = `<a href="${downloadURL}"><img src="../images/open.gif" alt="Your GIF"></a>`; 
  
      count++;
    });
  };
  