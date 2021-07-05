import firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA5_KiW-Q1jabaFfz7-y6fusYRBHrhEaSo",
  authDomain: "messageboard3-4273e.firebaseapp.com",
  projectId: "messageboard3-4273e",
  storageBucket: "messageboard3-4273e.appspot.com",
  messagingSenderId: "249494891684",
  appId: "1:249494891684:web:37b55a8060bcb9c86a4a31",
  measurementId: "G-BWZLX8DCKT"
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
