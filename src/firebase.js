// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth , GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJqCZUjmmso9vlebm8lbf4XwqcI-EDSbs",
    authDomain: "blog-new-project-71243.firebaseapp.com",
    projectId: "blog-new-project-71243",
    storageBucket: "blog-new-project-71243.appspot.com",
    messagingSenderId: "575338413948",
    appId: "1:575338413948:web:7432befcde81035497aef9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);