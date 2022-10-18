// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getStorage} from 'firebase/storage'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVgWi5X13KfjDlrS76Osj8Z9KeDT9RNnk",
  authDomain: "insta-reels-85be3.firebaseapp.com",
  projectId: "insta-reels-85be3",
  storageBucket: "insta-reels-85be3.appspot.com",
  messagingSenderId: "299288824673",
  appId: "1:299288824673:web:322f226d641fd04007d320",
  measurementId: "G-HX1F2QZSLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth();
const storage=getStorage(app);
const db=getFirestore(app);
export { auth , storage,db};