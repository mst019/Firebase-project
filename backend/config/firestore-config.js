// Import the functions you need from the SDKs you need

firebase = require("firebase");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTlMHSpnh0g2DywtFDby2K4l5Y4kLdnvM",
  authDomain: "test-project-77ac9.firebaseapp.com",
  projectId: "test-project-77ac9",
  storageBucket: "test-project-77ac9.appspot.com",
  messagingSenderId: "388026278482",
  appId: "1:388026278482:web:024c7dd978512f040b758b",
  measurementId: "G-17T7STQLRV",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const Product = db.collection("products");
module.exports = Product;
