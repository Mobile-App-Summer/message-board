import firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDm0YWyU0NaEupT5UjGnBMcbhfWgEQRxEQ",
  authDomain: "mba1-80ec8.firebaseapp.com",
  projectId: "mba1-80ec8",
  storageBucket: "mba1-80ec8.appspot.com",
  messagingSenderId: "782925214060",
  appId: "1:782925214060:web:3b431959df84741c218349",
  measurementId: "G-793NRF35K5"
  };

  let app;

  if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
  }else{
    app = firebase.app();
  }

  const auth = firebase.auth();
  const db = app.firestore();


  export { db, auth };
