// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBLqBqG2W3hLNg-G3_8Q2J6QZ9kpZ7DBF0",
  authDomain: "foodies-a2b93.firebaseapp.com",
  projectId: "foodies-a2b93",
  storageBucket: "foodies-a2b93.firebasestorage.app",
  messagingSenderId: "222422253588",
  appId: "1:222422253588:web:af79291d658f9ddb692701",
  measurementId: "G-20LJ0WCVZV",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
