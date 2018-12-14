import firebase from 'firebase/app';
import "firebase/auth";
import "firebase/database";
import "firebase/storage";


var config = {
    apiKey: "AIzaSyB36h_PxD20PxTp6GOGkS9_h-gL0qKm1Yw",
    authDomain: "react-slack-clone-50152.firebaseapp.com",
    databaseURL: "https://react-slack-clone-50152.firebaseio.com",
    projectId: "react-slack-clone-50152",
    storageBucket: "react-slack-clone-50152.appspot.com",
    messagingSenderId: "314296941673"
  };
  firebase.initializeApp(config);

  export default firebase;
