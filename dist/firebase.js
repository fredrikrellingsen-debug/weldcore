// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJ8mkn0qzNaugZ4BYR4R3-igCk2oVQAak",
  authDomain: "pot-kunder-439a4.firebaseapp.com",
  projectId: "pot-kunder-439a4",
  storageBucket: "pot-kunder-439a4.firebasestorage.app",
  messagingSenderId: "461155550472",
  appId: "1:461155550472:web:76a9c52afc45550ae3d8bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app, firebaseConfig };
