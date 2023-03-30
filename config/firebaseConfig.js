// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBUNkykHHoZLJSFNimqHYxa8XihSgKWYrw',
  authDomain: 'auj-admission.firebaseapp.com',
  projectId: 'auj-admission',
  storageBucket: 'auj-admission.appspot.com',
  messagingSenderId: '896635468100',
  appId: '1:896635468100:web:5aea578598d0bbd6ec7f11',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getDatabase();
