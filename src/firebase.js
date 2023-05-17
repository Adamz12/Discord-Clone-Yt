// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app"
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyDaErPZu1AurNuC-xUCwXcoItrH0AYEgvk",
  authDomain: "discord-clone-yt-388de.firebaseapp.com",
  projectId: "discord-clone-yt-388de",
  storageBucket: "discord-clone-yt-388de.appspot.com",
  messagingSenderId: "890098300494",
  appId: "1:890098300494:web:21307359928d866f67f51f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default app;
export { auth, provider, db, firebase};
