import firebase from 'firebase'
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC_CHthj5ozh7vXjuJRCp_jWqmFSBnKy4A",
    authDomain: "messageboard-feb20.firebaseapp.com",
    databaseURL: "https://messageboard-feb20-default-rtdb.firebaseio.com",
    projectId: "messageboard-feb20",
    storageBucket: "messageboard-feb20.appspot.com",
    messagingSenderId: "730216529946",
    appId: "1:730216529946:web:b4b06097049d38aa1051a3",
    measurementId: "G-08CLXRH7E4"
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
