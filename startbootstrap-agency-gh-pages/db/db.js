import {
  getFirestore,
  collection,
  getDocs,
  addDoc
} from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js';

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAmn5x4tWEkXXr6ByWiUgdW9vnoTzg7cTk",
  authDomain: "database-232ad.firebaseapp.com",
  projectId: "database-232ad",
  storageBucket: "database-232ad.appspot.com",
  messagingSenderId: "306590391436",
  appId: "1:306590391436:web:ef94d8dd0603c41847afa9",
  measurementId: "G-Z7MZWD9JEG"
};

const app = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(app);

let messages = [];

async function getMessages() {
  const messagesCol = collection(db, 'messages');
  const messagesSnapshot = await getDocs(messagesCol);
  const messages = messagesSnapshot.docs.map(doc => doc.data());
  return messages;
}

getMessages().then(m => {
  messages = m;
  renderMessages();
});

function renderMessages() {
  const mmm = document.querySelector('#messages');

  mmm.innerHTML = messages
    .map(message => `<p>${message.name}, ${message.email}, ${message.phone}, ${message.message}</p>`)
    .join('');
}

function setupForm() {
  const submitButton = document.querySelector('#submitButton');

  const nameField = document.querySelector('#name');
  const emailField = document.querySelector('#email');
  const phoneField = document.querySelector('#phone');
  const messageField = document.querySelector('#message');

  submitButton.addEventListener('click', async () => {
    await addDoc(collection(db, 'messages'), {
      name: nameField.value,
      email: emailField.value,
      phone: phoneField.value,
      message: messageField.value
    });

    messages.push({
      name: nameField.value,
      email: emailField.value,
      phone: phoneField.value,
      message: messageField.value
    });

    renderMessages();
  });
}

window.addEventListener('DOMContentLoaded', setupForm);
