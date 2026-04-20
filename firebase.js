import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQYsdf4EU_l1bs_uA2YFK2li8hNI2k2jY",
  authDomain: "zeroqueuemate.firebaseapp.com",
  projectId: "zeroqueuemate",
  storageBucket: "zeroqueuemate.firebasestorage.app",
  messagingSenderId: "366130479460",
  appId: "1:366130479460:web:964e0b67bd731690d0fa71",
  measurementId: "G-7L082X2ZMM"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);