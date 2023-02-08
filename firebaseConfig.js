import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwAjBsZ2_i8Bs9vJMvhDtW1daahv4WGb0",
  authDomain: "citconnect-d908a.firebaseapp.com",
  projectId: "citconnect-d908a",
  storageBucket: "citconnect-d908a.appspot.com",
  messagingSenderId: "195322227143",
  appId: "1:195322227143:web:e7a5be58b7521b6eee11e2",
  measurementId: "G-S5788L6WYD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore();

export { auth, db };
