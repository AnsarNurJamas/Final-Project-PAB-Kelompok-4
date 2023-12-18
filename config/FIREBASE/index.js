// DATABASE UTAMA

// import firebase from "firebase/compat/app";
// import "firebase/compat/auth";
// import "firebase/compat/firestore";
// import "firebase/compat/database";
// import 'firebase/functions';


// firebase.initializeApp({
//     apiKey: "AIzaSyAjjKrkVMqRVFlSEkNYUF55xKZ5wPPqn_s",
//     authDomain: "fiseesh.firebaseapp.com",
//     projectId: "fiseesh",
//     storageBucket: "fiseesh.appspot.com",
//     messagingSenderId: "653474692414",
//     appId: "1:653474692414:web:a542793618ad874b0c006f",
//     measurementId: "G-3B9XMZ4E4Y"
// });

// const FIREBASE = firebase;

// export default FIREBASE;

// DATABASE CADANGAN

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
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