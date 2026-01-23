// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUL5pZ5qUobbLsb59b6V1u1g47fcInNbg",
  authDomain: "netflix-gpt-eb690.firebaseapp.com",
  projectId: "netflix-gpt-eb690",
  storageBucket: "netflix-gpt-eb690.firebasestorage.app",
  messagingSenderId: "1048949765035",
  appId: "1:1048949765035:web:bb5d7cb16c88ef134e58ee",
  measurementId: "G-D1Z9SR23L7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
