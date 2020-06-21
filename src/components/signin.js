import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import Google from '../assets/google-icon.svg';
import firebase from './firebase';
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBLnSVPKdzgp0EqSwbOUnqeN0RBrBggdiw",
//   authDomain: "recogx-603c8.firebaseapp.com",
//   databaseURL: "https://recogx-603c8.firebaseio.com",
//   projectId: "recogx-603c8",
//   storageBucket: "recogx-603c8.appspot.com",
//   messagingSenderId: "840991282038",
//   appId: "1:840991282038:web:0e2dbce09c7fbedd60e057",
//   measurementId: "G-Z7XYVP2KZ3"
// };

// firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();

class Signin extends React.Component {
  // constructor(props){
  //   super(props);
  // }
    signinHandler() {
      auth.signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user.emailVerified)
        
        if(user.emailVerified){
          localStorage.setItem("loggedIn", 1)
          console.log('HI', this.props)
          // this.props.logs.history.push('/analyze')
          // return <Redirect to='/analyze' /> ;
        }
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    }
    render() {
      return (
          <div>
               <Button size="large" onClick={this.signinHandler}>Sign In with Google</Button>
          </div>
      )
    }
}

export default Signin;