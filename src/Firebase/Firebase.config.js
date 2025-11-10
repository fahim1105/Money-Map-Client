// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCO07LR_k8OwZ-NbWKrhKGsOjGHE8lF7PQ",
  authDomain: "money-map-a4b02.firebaseapp.com",
  projectId: "money-map-a4b02",
  storageBucket: "money-map-a4b02.firebasestorage.app",
  messagingSenderId: "129761993287",
  appId: "1:129761993287:web:39ccdb35befd1169098762"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)