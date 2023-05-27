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
var docId = sessionStorage.getItem("documentId")
console.log(docId)
var pdfDownloadURL= sessionStorage.getItem("pdfDownloadURL")
const documentRef = doc(db, 'data', docId);
await updateDoc(documentRef, { Fstatus: "Done" });
console.log("set");
window.location.href = pdfDownloadURL;