import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage"
import "firebase/compat/firestore";
import "firebase/compat/database";
import 'firebase/functions';


firebase.initializeApp({
    apiKey: "AIzaSyAnkLy7YfqZhvbAVldXLob2e1nwmgLjX-A",
  authDomain: "fiseeshclone.firebaseapp.com",
  databaseURL: "https://fiseeshclone-default-rtdb.firebaseio.com",
  projectId: "fiseeshclone",
  storageBucket: "fiseeshclone.appspot.com",
  messagingSenderId: "424899252794",
  appId: "1:424899252794:web:f7a40cbc06eb3fcd091b03"
});

const FIREBASE = firebase;

export default FIREBASE;