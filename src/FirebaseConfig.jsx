// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore, doc, setDoc } from "firebase/firestore"; // Add doc and setDoc
// import { getMessaging, getToken, onMessage } from "firebase/messaging"; // Import FCM functions

// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };

// const app = initializeApp(firebaseConfig);

// export const authentication = getAuth(app);
// export const db = getFirestore(app);
// export const messaging = getMessaging(app);

// // Request FCM token and handle it appropriately
// export const requestFCMToken = async (userId) => {
//   try {
//     const currentToken = await getToken(messaging, {
//       vapidKey: "BEJL96iyPT2mY0K8En4GgtmVzdYswhOoUYsoGAMDn6n",
//     });
//     if (currentToken) {
//       console.log("FCM Token:", currentToken);
//       // Store the token in Firestore, associated with the user's UID
//       await setTokenInFirestore(userId, currentToken);
//     } else {
//       console.log(
//         "No registration token available. Request permission to generate one."
//       );
//     }
//   } catch (error) {
//     console.error("An error occurred while retrieving token.", error);
//   }
// };

// // Store the FCM token in Firestore
// const setTokenInFirestore = async (userId, token) => {
//   const userRef = doc(db, "users", userId);
//   await setDoc(userRef, { fcmToken: token }, { merge: true });
// };

// // Handle incoming messages in the foreground
// onMessage(messaging, (payload) => {
//   console.log("Message received. ", payload);
//   // Handle the message payload (show notification, update UI, etc.)
// });
// // Initialize Firebase Messaging

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Initialize Firebase app
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);

export const authentication = getAuth(app);
export const db = getFirestore(app);

export default app;
