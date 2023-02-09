// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDdcXRzs7090SkAiBKhtap0cg94F-nhSjQ",
    authDomain: "who-s-turn-is-it-anyways.firebaseapp.com",
    databaseURL: "https://who-s-turn-is-it-anyways-default-rtdb.firebaseio.com",
    projectId: "who-s-turn-is-it-anyways",
    storageBucket: "who-s-turn-is-it-anyways.appspot.com",
    messagingSenderId: "213487101818",
    appId: "1:213487101818:web:6eca50707591424a7398c3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);