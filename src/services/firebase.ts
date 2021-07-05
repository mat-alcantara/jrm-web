/* eslint-disable */

import firebase from 'firebase/app';

import 'firebase/database'
import 'firebase/auth';
import "firebase/analytics";

const firebaseConfig = {
  apiKey: 'AIzaSyAICud6Acmg5Y9qstwXcx6kqlIGAEz9Rs8',
  authDomain: 'jrm-cortes.firebaseapp.com',
  databaseURL: 'https://jrm-cortes-default-rtdb.firebaseio.com',
  projectId: 'jrm-cortes',
  storageBucket: 'jrm-cortes.appspot.com',
  messagingSenderId: '976651849059',
  appId: '1:976651849059:web:0355486f1cbe02fe95d756',
  measurementId: 'G-H4G2TCYSZF',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database };
