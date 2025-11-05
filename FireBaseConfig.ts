// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkBDhLc-it2Pw_YnJV4Fnx3dMYR10I500",
  authDomain: "fir-cimaroyal.firebaseapp.com",
  projectId: "fir-cimaroyal",
  storageBucket: "fir-cimaroyal.firebasestorage.app",
  messagingSenderId: "125201994825",
  appId: "1:125201994825:web:c1eed705256bc0309b5b98",
  measurementId: "G-WJL1R0WS5R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only if supported (fixes web/SSR issues)
let analytics;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

const auth = getAuth(app);

export { app, auth, analytics };