// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNdY7pMzxd2AArvE1NyCMweb_DelQPUsM",
  authDomain: "movielist-c7ce2.firebaseapp.com",
  projectId: "movielist-c7ce2",
  storageBucket: "movielist-c7ce2.appspot.com",
  messagingSenderId: "1052331963779",
  appId: "1:1052331963779:web:a18cfaed3e4a49647132b6"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }