import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAkfW40MafJFzzj5g8QPBfo3GjW5VrhbI0",
  authDomain: "[pantau-oma.firebaseapp.com](http://pantau-oma.firebaseapp.com/)",
  projectId: "pantau-oma",
  storageBucket: "pantau-oma.firebasestorage.app",
  messagingSenderId: "75395527174",
  appId: "1:75395527174:web:ddac264038bb3a4a9d4987",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
