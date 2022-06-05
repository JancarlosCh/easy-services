import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTAv8drOHh8763CXBkDNttLqn0M9M7OZs",
  authDomain: "easy-services-f0f80.firebaseapp.com",
  projectId: "easy-services-f0f80",
  storageBucket: "easy-services-f0f80.appspot.com",
  messagingSenderId: "867306564044",
  appId: "1:867306564044:web:5471b0dd705d4e01f51569",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Authentication service
const auth = getAuth();

export const authentication = () => {
  const loginWithEmail = (data) => {
    const { email, password } = data;
    const response = signInWithEmailAndPassword(auth, email, password);
    console.log(auth)
    return response;
  };

  const registerWithEmail = (data) => {
    const { email, password } = data;
    const response = createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return response;
  };

  return { loginWithEmail, registerWithEmail };
};
