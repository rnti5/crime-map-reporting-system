import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-wQRiq6DAnukrgyisr7UlBWjPSbjJCOo",
  authDomain: "crime-report-5c09f.firebaseapp.com",
  projectId: "crime-report-5c09f",
  storageBucket: "crime-report-5c09f.appspot.com",
  messagingSenderId: "482196548122",
  appId: "1:482196548122:web:ca8e8031d8f1a1795a7fa3",
  measurementId: "G-LJFH54SRHK",
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
export const db = getFirestore(app);
