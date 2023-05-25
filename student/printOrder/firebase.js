import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js'
import { getAuth, signOut } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js'
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


const radio1 = document.querySelector('.radio1');
const radio2 = document.querySelector('.radio2');
const radio3 = document.querySelector('.radio3');
const paymentMethod = document.querySelector('.wrapper');
var type = 'B & W';
var mode = 'Potrait';
var side = 'Single';
var method = 'Online'
// Add event listener to the container
radio1.addEventListener('change', function (event) {
  // Get the selected radio button value
  const selectedValue = event.target.value;
  //console.log(selectedValue);
  type = selectedValue;
});
radio2.addEventListener('change', function (event) {
  // Get the selected radio button value
  const selectedValue = event.target.value;
  //console.log(selectedValue);
  mode = selectedValue;
});
radio3.addEventListener('change', function (event) {
  // Get the selected radio button value
  const selectedValue = event.target.value;
  //console.log(selectedValue);
  side = selectedValue;
});

const plus = document.querySelector(".plus"),
  minus = document.querySelector(".minus"),
  num = document.querySelector(".num");
let count = 1;
plus.addEventListener("click", () => {
  count++;
  count = (count < 10) ? "0" + count : count;
  num.innerText = count;
  //console.log(a);
});
minus.addEventListener("click", () => {
  if (count > 1) {
    count--;
    count = (count < 10) ? "0" + count : count;
    num.innerText = count;
  }
});

paymentMethod.addEventListener('change', function (event) {
  // Get the selected radio button value
  const selectedValue = event.target.value;
  //console.log(selectedValue);
  method = selectedValue;
});

let mediaRecorder;
let chunks = [];
let stream;
let audioPlayer = document.getElementById('audio-player');
let audioUrl = "nil"

document.getElementById("start").addEventListener('click', function (event) {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (streamData) {
      stream = streamData;
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.addEventListener('dataavailable', function (event) {
        chunks.push(event.data);
      });
      mediaRecorder.start();
      console.log('Recording started');
      document.getElementById("stop").disabled = false;
      document.getElementById("start").disabled = true;
    })
    .catch(function (error) {
      console.error('Error accessing microphone:', error);
    });
});

document.getElementById("stop").addEventListener('click', function (event) {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    mediaRecorder.addEventListener('stop', function () {
      const audioBlob = new Blob(chunks, { type: 'audio/webm' });
      audioUrl = URL.createObjectURL(audioBlob);
      audioPlayer.src = audioUrl;
      //audioPlayer.play();
      console.log('Recording stopped');
      document.getElementById("start").disabled = false;
      console.log('Audio URL:', audioUrl);
      document.getElementById("audio-player").style.display = "block";
      // Do something with the recorded audio data (e.g., upload to Firebase)
    });
  }
});

let fileName;
var pageCount;
document.getElementById("file-upload").addEventListener('change', function (event) {
  const fileInput = document.getElementById('file-upload');
  const labelUpload = document.getElementById('label-upload');
  if (fileInput.files.length > 0) {
    labelUpload.textContent = fileInput.files[0].name;
  } else {
    labelUpload.textContent = '';
  }
  fileName = fileInput.files[0].name;
});

var script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js';
script.onload = function() {
  document.getElementById("file-upload").addEventListener('change', function (event) {
    const fileInput = document.getElementById('file-upload');

    // Check if a file is selected
    if (fileInput.files.length === 0) {
      console.log('No file selected.');
      return;
    }

    const file = fileInput.files[0];

    // Read the file
    const reader = new FileReader();
    reader.onload = function (e) {
      const fileData = new Uint8Array(e.target.result);

      // Load the PDF document
      pdfjsLib.getDocument(fileData).promise.then(function (pdf) {
        // Get the number of pages
        pageCount = pdf.numPages;
        //console.log('Number of pages:', pageCount);
      }).catch(function (error) {
        console.error('Error loading PDF:', error);
      });
    };
    reader.readAsArrayBuffer(file);
});
}
document.head.appendChild(script);


document.getElementById("submit").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent form submission
  console.log(type);
  console.log(mode);
  console.log(side);
  console.log(count);
  console.log(method);
  console.log(audioUrl);
  console.log(fileName);
  console.log(pageCount);
});


