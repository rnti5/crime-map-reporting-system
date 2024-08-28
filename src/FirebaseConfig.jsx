import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore"; // Add doc and setDoc
import { getMessaging, getToken, onMessage } from "firebase/messaging"; // Import FCM functions

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
export const messaging = getMessaging(app);

// Request FCM token and handle it appropriately
export const requestFCMToken = async (userId) => {
  try {
    const currentToken = await getToken(messaging, {
      vapidKey: "BO2ei9ZD3EpVaEhnZGIpyDgXpqQOoOPgjCl15adEj7hQwz",
    });
    if (currentToken) {
      console.log("FCM Token:", currentToken);
      // Store the token in Firestore, associated with the user's UID
      await setTokenInFirestore(userId, currentToken);
    } else {
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (error) {
    console.error("An error occurred while retrieving token.", error);
  }
};

// Store the FCM token in Firestore
const setTokenInFirestore = async (userId, token) => {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, { fcmToken: token }, { merge: true });
};

// Handle incoming messages in the foreground
onMessage(messaging, (payload) => {
  console.log("Message received. ", payload);
  // Handle the message payload (show notification, update UI, etc.)
});
// Initialize Firebase Messaging
