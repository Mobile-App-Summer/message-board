import firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAB9lLrDf_wVoG8kifZUwuJldf0lNQ8OKo",
  authDomain: "boardmessage-9ea3f.firebaseapp.com",
  projectId: "boardmessage-9ea3f",
  storageBucket: "boardmessage-9ea3f.appspot.com",
  messagingSenderId: "361924825891",
  appId: "1:361924825891:web:11fe3bdc3e3371a804b296",
  measurementId: "G-SJNBZEJKF1"
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
