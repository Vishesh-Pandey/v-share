// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
// This is testing firebaseConfig and will be updated in future with new config + env. variables
const firebaseConfig = {
  apiKey: "AIzaSyBl7QxcMS4U1AjYwDX9c1EL0-b3B9jY9ng",
  authDomain: "huddy-baba.firebaseapp.com",
  projectId: "huddy-baba",
  storageBucket: "huddy-baba.appspot.com",
  messagingSenderId: "697546003674",
  appId: "1:697546003674:web:5499772cc387f1505781e3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const realtimedb = getDatabase();
export default app;
