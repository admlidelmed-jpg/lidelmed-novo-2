import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

// SUAS CHAVES
const firebaseConfig = {
  apiKey: "AIzaSyAyigpbQD_5P1g9QZIQzcncKVWQ-NhiSAE",
  authDomain: "lidel-med-app.firebaseapp.com",
  projectId: "lidel-med-app",
  storageBucket: "lidel-med-app.firebasestorage.app",
  messagingSenderId: "729431686434",
  appId: "1:729431686434:web:df970d8d88526533b2ef97b"
};

// INICIALIZA
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const loginBox = document.getElementById('login-box');
const appContent = document.getElementById('app-content');

onAuthStateChanged(auth, user => {
  if (user) {
    loginBox.style.display = 'none';
    appContent.style.display = 'block';
    setDoc(doc(db, "clientes", user.uid), { telefone: user.phoneNumber, ultimaVisita: new Date() });
  } else {
    loginBox.style.display = 'block';
    appContent.style.display = 'none';
  }
});

document.getElementById('send-code').addEventListener('click', () => {
  const phoneNumber = document.getElementById('phone-number').value;
  window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
  signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
  .then(confirmationResult => {
    window.confirmationResult = confirmationResult;
    document.getElementById('code').style.display = 'block';
    document.getElementById('verify-code').style.display = 'block';
    alert("Código enviado pro WhatsApp!");
  }).catch(error => alert(error.message));
});

document.getElementById('verify-code').addEventListener('click', () => {
  const code = document.getElementById('code').value;
  window.confirmationResult.confirm(code).catch(error => alert("Código inválido"));
});
