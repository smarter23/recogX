import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBLnSVPKdzgp0EqSwbOUnqeN0RBrBggdiw",
    authDomain: "recogx-603c8.firebaseapp.com",
    databaseURL: "https://recogx-603c8.firebaseio.com",
    projectId: "recogx-603c8",
    storageBucket: "recogx-603c8.appspot.com",
    messagingSenderId: "840991282038",
    appId: "1:840991282038:web:0e2dbce09c7fbedd60e057",
    measurementId: "G-Z7XYVP2KZ3"
  };

  firebase.initializeApp(firebaseConfig);
// export const auth = firebase.auth();
// export const firestore = firebase.firestore();
// export const provider = new firebase.auth.GoogleAuthProvider(); 

export default firebase;