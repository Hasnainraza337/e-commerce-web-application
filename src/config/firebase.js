// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    // appId: process.env.REACT_APP_APP_ID,
    // measurementId: process.env.REACT_APP_MEASUREMENT_ID



    apiKey: "AIzaSyBl20QBWFwCrLiTnFsWiQjyqW-SLpvgwVs",
    authDomain: "e-commerce2-72e4f.firebaseapp.com",
    projectId: "e-commerce2-72e4f",
    storageBucket: "e-commerce2-72e4f.appspot.com",
    messagingSenderId: "576924940941",
    appId: "1:576924940941:web:802d983a68de4b33b8c0c4",
    measurementId: "G-FVB8EWYZEL"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { analytics, auth, firestore, storage }