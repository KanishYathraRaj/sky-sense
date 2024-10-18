// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration (from Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyA-YIpvaNNps3XlNvGhZmPfX5UEaFB1Kak",
  authDomain: "leetcoderoaster-db-d1704.firebaseapp.com",
  projectId: "leetcoderoaster-db-d1704",
  storageBucket: "leetcoderoaster-db-d1704.appspot.com",
  messagingSenderId: "76877381410",
  appId: "1:76877381410:web:4faf7685c06aed2143af7b",
  measurementId: "G-7L4BB1LZ57"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services (authentication, firestore, etc.)
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
