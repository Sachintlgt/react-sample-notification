import * as firebase from 'firebase/app';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCO5R0ny-ZmQGkuPV-toAOOQKPZBwd8M74",
    authDomain: "react-notification-8d29d.firebaseapp.com",
    projectId: "react-notification-8d29d",
    storageBucket: "react-notification-8d29d.appspot.com",
    messagingSenderId: "818928353863",
    appId: "1:818928353863:web:ec90a4e109182db558e762",
    measurementId: "G-MWBHQNY33X"
};
const app = firebase.initializeApp(firebaseConfig);

export const db = getFirestore(app);