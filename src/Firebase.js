// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { createUserWithemailandPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage,ref} from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB_k5dROFQcBEdKTvwn7Rkknio5WvQa0Gw",
    authDomain: "talki-41d5a.firebaseapp.com",
    projectId: "talki-41d5a",
    storageBucket: "talki-41d5a.appspot.com",
    messagingSenderId: "922965664132",
    appId: "1:922965664132:web:56ef2665ea78cf07c8bdd1"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);// JavaScript source code
export const auth = getAuth(app);
export const storage = getStorage();
export const db = getFirestore(app);

