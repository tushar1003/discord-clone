import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBoQup7kZrXx5gcVPHl6UkVmMr53UI8zjk",
    authDomain: "discord-clone-app-e79ab.firebaseapp.com",
    projectId: "discord-clone-app-e79ab",
    storageBucket: "discord-clone-app-e79ab.appspot.com",
    messagingSenderId: "262048004368",
    appId: "1:262048004368:web:b446ffa5e61b28ed1fcd95",
    measurementId: "G-PRNXXQY3CZ"
  };

  const app=firebase.initializeApp(firebaseConfig);

  const db=app.firestore();
  const auth=firebase.auth();
  const provider=new firebase.auth.GoogleAuthProvider();

  export { auth, db , provider };