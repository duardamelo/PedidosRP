import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDMFa_YLHBAuZBOuUPhu79AMKPOlTGTW-o",
  authDomain: "sistema-pedidos-23f24.firebaseapp.com",
  projectId: "sistema-pedidos-23f24",
  storageBucket: "sistema-pedidos-23f24.firebasestorage.app",
  messagingSenderId: "729191219954",
  appId: "1:729191219954:web:de1ec08e1da3b3387c866b"
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);