// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6DLp1-G-kK6IfBcrrkltf6iJbxzUFnvE",
  authDomain: "myblogs-395a3.firebaseapp.com",
  projectId: "myblogs-395a3",
  storageBucket: "myblogs-395a3.appspot.com",
  messagingSenderId: "697334546676",
  appId: "1:697334546676:web:92aafb68deede73e66dea1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)