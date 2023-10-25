// Import the functions you need from the SDKs you need
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import {getFirestore} from '@react-native-firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
//  databaseURL: 'YOUR_DATABASE_URL',
  apiKey: "AIzaSyAh2HIfSNNOcqIa5GBOdNZVf1IW7iw2OAI",
  authDomain: "reactfirebase-550f9.firebaseapp.com",
  projectId: "reactfirebase-550f9",
  storageBucket: "reactfirebase-550f9.appspot.com",
  messagingSenderId: "142416867568",
  appId: "1:142416867568:web:366f9b4c3ee82356a55235",
  measurementId: "G-5VM31DC3H0"
};




let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(RNfirebaseConfig )
} else {
    app = firebase.app()
}

const auth = firebase.auth();

export const db = getFirestore();

export default firebase;
