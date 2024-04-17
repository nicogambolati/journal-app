// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyttNod19PZS2C8XMthWtTBnCbqbPnaR4",
  authDomain: "journal-app-86f04.firebaseapp.com",
  projectId: "journal-app-86f04",
  storageBucket: "journal-app-86f04.appspot.com",
  messagingSenderId: "81922649935",
  appId: "1:81922649935:web:e3340eb95670f805579f3a"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

// Export FirebaseAuth and get a reference to the firebase auth object
export const FirebaseAuth = getAuth(FirebaseApp);

// Export Cloud Firestore and get a reference to the service
export const FirebaseDB = getFirestore(FirebaseApp);