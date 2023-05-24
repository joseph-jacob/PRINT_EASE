// import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js'
// import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-analytics.js'
// import { getAuthsignOut} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js'
// import { getFirestore, addDoc, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js'
// const firebaseConfig = {
//   apiKey: "AIzaSyBCtvK5bUFqSRGWYTVXnNLHsSdSMMfyEdQ",
//   authDomain: "printease-875ad.firebaseapp.com",
//   projectId: "printease-875ad",
//   storageBucket: "printease-875ad.appspot.com",
//   messagingSenderId: "903339769147",
//   appId: "1:903339769147:web:cd509e3189d24e59ad8b1e",
//   measurementId: "G-L1DX6GPNRG"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth();
// const db = getFirestore();


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
    method =selectedValue;
});

let mediaRecorder;
let chunks = [];
let stream;
let audioPlayer = document.getElementById('audio-player');

function startRecording() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(streamData) {
      stream = streamData;
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.addEventListener('dataavailable', function(event) {
        chunks.push(event.data);
      });
      mediaRecorder.start();
      console.log('Recording started');
    })
    .catch(function(error) {
      console.error('Error accessing microphone:', error);
    });
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') {
    mediaRecorder.stop();
    mediaRecorder.addEventListener('stop', function() {
      const audioBlob = new Blob(chunks, { type: 'audio/webm' });
      const audioUrl = URL.createObjectURL(audioBlob);
      audioPlayer.src = audioUrl;
      audioPlayer.play();
      console.log('Recording stopped');
      console.log('Audio URL:', audioUrl);
      // Do something with the recorded audio data (e.g., upload to Firebase)
    });
  }
}



document.getElementById("submit").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent form submission
    console.log(type);
    console.log(mode);
    console.log(side);
    console.log(count);
    console.log(method);
});