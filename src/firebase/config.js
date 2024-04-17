// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlEv1tc31E9na0UQlnX-NjzWrouMmAspw",
  authDomain: "journal-app-react-8c96f.firebaseapp.com",
  projectId: "journal-app-react-8c96f",
  storageBucket: "journal-app-react-8c96f.appspot.com",
  messagingSenderId: "118478225432",
  appId: "1:118478225432:web:572be25461b7325197c36d"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

// Export FirebaseAuth and get a reference to the firebase auth object
export const FirebaseAuth = getAuth(FirebaseApp);

// Export Cloud Firestore and get a reference to the service
export const FirebaseDB = getFirestore(FirebaseApp);