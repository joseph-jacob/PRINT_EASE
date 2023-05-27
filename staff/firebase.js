

import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js';
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
    console.log(querySnapshot)
    for (const doc of querySnapshot.docs) {
      const pdfRef = ref(storage, doc.data().File);
      const audioRef = ref(storage, doc.data().Faudio);
      const docId=doc.id;
      
      // Access the 'Name' property from the document data
      const pdfDownloadURL = await getDownloadURL(pdfRef);
      const audioDownloadURL = await getDownloadURL(audioRef);
      
      const row = document.getElementById("tbody").insertRow(0);
      row.insertCell(0).innerHTML = count;
      row.insertCell(1).innerHTML = doc.data().email;
      row.insertCell(2).innerHTML = doc.data().FName;
      row.insertCell(3).innerHTML = doc.data().Fprice;
      row.insertCell(4).innerHTML = doc.data().Fmethod;
      row.insertCell(5).innerHTML = doc.data().Date;
      row.insertCell(6).innerHTML = doc.data().Fcount;
      row.insertCell(7).innerHTML = doc.data().FType;
      row.insertCell(8).innerHTML = doc.data().Fside;
      row.insertCell(9).innerHTML = `<audio src="${audioDownloadURL}" controls></audio>`;
      row.insertCell(10).innerHTML = doc.data().Fstatus;
      row.insertCell(11).innerHTML = `<img src="../images/open.gif" alt="Your GIF"></a>`;
      count++;

      
      var done = "Done";
      const imageElement = row.cells[11].querySelector("img");
      imageElement.onclick = async function () {
        sessionStorage.setItem("documentId",docId);
        sessionStorage.setItem("pdfDownloadURL",pdfDownloadURL);
        window.location.href = "./update.html";
        //window.location.href = pdfDownloadURL;
      }

    }

  } else {
    window.location.href = "../login.html";
  }
});