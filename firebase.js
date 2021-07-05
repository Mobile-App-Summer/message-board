import firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBucMFDH9Jzun9JNq2FiOcBlaFzr4y5mMw",
  authDomain: "messageboard5.firebaseapp.com",
  projectId: "messageboard5",
  storageBucket: "messageboard5.appspot.com",
  messagingSenderId: "720405256874",
  appId: "1:720405256874:web:5875b72df3614534dc4ed3",
  measurementId: "G-EMHJEGJ4KT"
  };

  let app;

  if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
  }else{
    app = firebase.app();
  }

  const db = app.firestore();
  const auth = firebase.auth();

  export { db, auth };
