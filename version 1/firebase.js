import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCxvYwxVetQ8jfh1zkqbFOaw6ga9ehjd8k",
  authDomain: "kanban-psicologia.firebaseapp.com",
  projectId: "kanban-psicologia",
  storageBucket: "kanban-psicologia.firebasestorage.app",
  messagingSenderId: "543662850700",
  appId: "1:543662850700:web:04bc7a20d488b960cd31a9",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { auth, db };

