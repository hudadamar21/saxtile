import firebase from 'firebase/app';
import 'firebase/auth';

import { firebaseConfig } from './firebase-config'

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.firestore().settings({
  cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});

firebase.firestore().enablePersistence()
  .catch(function (err) {
    if (err.code == 'unimplemented') {
      alert('Brower not support offline Webapp')
    }
  });