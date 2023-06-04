import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getFirestore, collection, getDocs, where, orderBy, query } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
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
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();

auth.onAuthStateChanged(async function (user) {
  if (user) {
    console.log(user.uid);
    // Retrieve data from Firestore
    const collectionRef = collection(db, 'data');
    const querySnapshot = await getDocs(query(collectionRef, where('uid', '==', user.uid), orderBy('timestamp')));

    // Get the container element where the cards will be displayed
    const cardContainer = document.getElementById('card-container');

    // Loop through the query snapshot and generate the HTML cards
    querySnapshot.forEach(async (doc) => {
      // Get the data from the document
      const data = doc.data();

      // Create the card element
      const card = document.createElement('div');
      card.className = 'container';

      // Create the box element
      const box = document.createElement('div');
      box.className = 'box';

      // Create the card content
      const cardContent = document.createElement('div');
      cardContent.className = 'card-content';

      // Get the reference to the file in Firebase Storage
      const storageRef = ref(storage, data.File);

      // Get the download URL for the file
      const downloadURL = await getDownloadURL(storageRef);

      // Populate the card content with the retrieved data and download URL
      cardContent.innerHTML = `
        <object data="${downloadURL}" type="application/pdf"></object>
        <strong>${data.FName}</strong>
        <span>Price : ${data.Fprice}</span><br>
        <span>Date  : ${data.Date}</span><br>
        <span>Status: ${data.Fstatus}</span><br>
        <a href="${downloadURL}"><img class="book" src="../../images/open.gif" alt="Your GIF"></a>
      `;

      // Append the card content to the box
      box.appendChild(cardContent);

      // Append the box to the card
      card.appendChild(box);

      // Append the card to the card container
      cardContainer.appendChild(card);
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
  } else {
    // The user is not signed in.
    window.location.href = '../.index.html';
  }
});