import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGuQBObvLIdKUVGzefE_6VwmRtsH7fLnA",
  authDomain: "input-hackathon.firebaseapp.com",
  projectId: "input-hackathon",
  storageBucket: "input-hackathon.firebasestorage.app",
  messagingSenderId: "3570059145",
  appId: "1:3570059145:web:256b955f64329d13bacf99",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
