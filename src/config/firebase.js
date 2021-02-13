import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDqbkEH4F_LxTivsT5B1UXN0unn_-XLDPg",
  authDomain: "saxtile.firebaseapp.com",
  databaseURL: "https://saxtile.firebaseio.com",
  projectId: "saxtile",
  storageBucket: "saxtile.appspot.com",
  messagingSenderId: "1069489785279",
  appId: "1:1069489785279:web:d2bb4d3f72482b0338f90a",
  measurementId: "G-3HQRV79B83"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);