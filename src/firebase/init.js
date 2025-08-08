// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCSi3qcojj5ILRJWQd0EVwrfX1TGqckBQ",
  authDomain: "week7-chenwei.firebaseapp.com",
  projectId: "week7-chenwei",
  storageBucket: "week7-chenwei.firebasestorage.app",
  messagingSenderId: "758386805061",
  appId: "1:758386805061:web:7a0662213353036d63162c"
};

// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()

export default db