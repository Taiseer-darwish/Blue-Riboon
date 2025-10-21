import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPE9ooTasARoL71KW8YRH9c5uVKAIG5uo",
  authDomain: "sport-club-system-c68a5.firebaseapp.com",
  projectId: "sport-club-system-c68a5",
  storageBucket: "sport-club-system-c68a5.firebasestorage.app",
  messagingSenderId: "91756942417",
  appId: "1:91756942417:web:a59e728fe7514ff0079470"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
