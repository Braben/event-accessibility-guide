// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {
  getAuth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "process.env.VENUEHUBS_FIREBASE_apiKey",
//   authDomain: "process.env.VENUEHUBS_FIREBASE_authDomain",
//   projectId: "process.env.VENUEHUBS_FIREBASE_projectId",
//   storageBucket: "process.env.VENUEHUBS_FIREBASE_storageBucket",
//   messagingSenderId: "process.env.VENUEHUBS_FIREBASE_messagingSenderId",
//   appId: "process.env.VENUEHUBS_FIREBASE_appId",
// };

const firebaseConfig = {
  apiKey: "AIzaSyDomoBX6EfF38vqBJyH-z3-PTKlwUIweEs",

  authDomain: "event-accessibility-guide.firebaseapp.com",
  projectId: "event-accessibility-guide",
  storageBucket: "event-accessibility-guide.firebasestorage.app",
  messagingSenderId: "768647749557",
  appId: "1:768647749557:web:0bec9b15783fddf57903fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
export {
  auth,
  googleProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
};
