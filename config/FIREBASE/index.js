import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import 'firebase/functions';


firebase.initializeApp({
    apiKey: "AIzaSyAjjKrkVMqRVFlSEkNYUF55xKZ5wPPqn_s",
    authDomain: "fiseesh.firebaseapp.com",
    projectId: "fiseesh",
    storageBucket: "fiseesh.appspot.com",
    messagingSenderId: "653474692414",
    appId: "1:653474692414:web:a542793618ad874b0c006f",
    measurementId: "G-3B9XMZ4E4Y"
});

const FIREBASE = firebase;

export default FIREBASE;