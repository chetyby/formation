// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAku9AMVVLsd7wbr9Ly3NlryOgNWb4yL7Y",
  authDomain: "projet-react-421bd.firebaseapp.com",
  projectId: "projet-react-421bd",
  storageBucket: "projet-react-421bd.appspot.com",
  messagingSenderId: "503496096919",
  appId: "1:503496096919:web:f9e3f9e3ae39910a7dbdd2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);