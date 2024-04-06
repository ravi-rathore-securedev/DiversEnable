// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1X77EtImNWa2-PoYFB9Pc26-8jCGTPho",
  authDomain: "social-media-f8b5a.firebaseapp.com",
  projectId: "social-media-f8b5a",
  storageBucket: "social-media-f8b5a.appspot.com",
  messagingSenderId: "783193914899",
  appId: "1:783193914899:web:dad374768f704841d3c9e6",
  measurementId: "G-G2HQM1K2K9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);