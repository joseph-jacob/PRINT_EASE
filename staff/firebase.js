

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js';
import { getAuth,signOut } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
import { getFirestore, collection, doc, getDocs, updateDoc, query, orderBy } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
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
auth.onAuthStateChanged(async function (user) {
  if (user) {
    const dataCollectionRef = collection(db, "data");
    const querySnapshot = await getDocs(query(dataCollectionRef, orderBy("timestamp")));
    let count = 1;
    for (const doc of querySnapshot.docs) {
      const pdfRef = ref(storage, doc.data().File);
      const audioRef = ref(storage, doc.data().Faudio);
      const docId = doc.id;

      // Access the 'Name' property from the document data
      const pdfDownloadURL = await getDownloadURL(pdfRef);
      const audioDownloadURL = await getDownloadURL(audioRef);


      const row = document.getElementById("tbody").insertRow(0);
      row.insertCell(0).innerHTML = count;
      //row.insertCell(1).innerHTML = doc.data().email;
      row.insertCell(1).innerHTML = `<a href="./othersProfile/index.html?uid=${doc.data().uid}&email=${doc.data().email}">${doc.data().email}</a>`;
      row.insertCell(2).innerHTML = doc.data().FName;
      row.insertCell(3).innerHTML = doc.data().Fprice;
      row.insertCell(4).innerHTML = doc.data().Fmethod;
      row.insertCell(5).innerHTML = doc.data().Date;
      row.insertCell(6).innerHTML = doc.data().Fcount;
      row.insertCell(7).innerHTML = doc.data().FType;
      row.insertCell(8).innerHTML = doc.data().Fside;
      row.insertCell(9).innerHTML = `<audio src="${audioDownloadURL}" controls></audio>`;
      row.insertCell(10).innerHTML = doc.data().Fstatus;
      row.insertCell(11).innerHTML = `<img class="book" src="../images/open.gif" alt="Your GIF"></a>`;
      count++;


      var done = "Done";
      const imageElement = row.cells[11].querySelector("img");
      imageElement.onclick = async function () {
        sessionStorage.setItem("documentId", docId);
        sessionStorage.setItem("pdfDownloadURL", pdfDownloadURL);
        sessionStorage.setItem("email", doc.data().email);
        sessionStorage.setItem("Fname", doc.data().FName);
        sessionStorage.setItem("price", doc.data().Fprice);

        window.location.href = "./update.html";
        //window.location.href = pdfDownloadURL;
      }

    }

    document.getElementById("logout").addEventListener("click", function (event) {
      event.preventDefault();
      signOut(auth).then(() => {
          // Sign-out successful.
          console.log('Sign-out successful.');
          alert('Sign-out successful.');
          
      }).catch((error) => {
          // An error happened.
          console.log('An error happened.');
      });
  });
  } else {
    window.location.href = "../index.html";
  }
});