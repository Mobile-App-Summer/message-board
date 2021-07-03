import firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCauA0jI6KiBb5ge48jPYh0QaRQlQmMfi8",
  authDomain: "summerfan-4905d.firebaseapp.com",
  databaseURL: "https://summerfan-4905d-default-rtdb.firebaseio.com",
  projectId: "summerfan-4905d",
  storageBucket: "summerfan-4905d.appspot.com",
  messagingSenderId: "177920797564",
  appId: "1:177920797564:web:525af7a9136bb7c5c712f9",
  measurementId: "G-YC35JKRE9B"
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
