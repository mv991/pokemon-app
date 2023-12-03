// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import {getFirestore,collection}  from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-zsxT34RkAEU7fWh1uG606DTjnwpvgNk",
  authDomain: "fir-project-10ee8.firebaseapp.com",
  projectId: "fir-project-10ee8",
  storageBucket: "fir-project-10ee8.appspot.com",
  messagingSenderId: "666780089482",
  appId: "1:666780089482:web:f6049f4e6520ebf75d4173",
  measurementId: "G-VRLEV1020H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore();

export const usersRef = collection(firebaseDB,"users");
export const pokemonListRef = collection(firebaseDB, "pokemonList");