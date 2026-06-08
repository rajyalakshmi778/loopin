import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7uWGwEPgXDvbDBh-snf7EkaKBjUY97ZU",
  authDomain: "p-and-p-loopin.firebaseapp.com",
  projectId: "p-and-p-loopin",
  storageBucket: "p-and-p-loopin.firebasestorage.app",
  messagingSenderId: "626456553944",
  appId: "1:626456553944:web:f0f2923f9c5a78cf426aad",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);