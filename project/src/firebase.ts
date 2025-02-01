import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
// const firebaseConfig = {
//   apiKey: "AIzaSyAbdOJrY9bkMEHmEfznJMD85rqIwDoV-yE",
//   authDomain: "webspaceconfig.firebaseapp.com",
//   projectId: "webspaceconfig",
//   storageBucket: "webspaceconfig.appspot.com", // Fixed storage bucket URL
//   messagingSenderId: "383701151078",
//   appId: "1:383701151078:web:fc65f26ed4236c072beca7",
//   measurementId: "G-P21TFMH5X4"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBoIoGjiesIsbuA2dfpXx6pbQ3BwOuPNWc",
  authDomain: "operating-in-the-black-68de2.firebaseapp.com",
  projectId: "operating-in-the-black-68de2",
  storageBucket: "operating-in-the-black-68de2.firebasestorage.app",
  messagingSenderId: "713787476033",
  appId: "1:713787476033:web:7dbc2c7e689ac970341ec0"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);