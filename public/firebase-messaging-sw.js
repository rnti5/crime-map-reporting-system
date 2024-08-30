/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
// Import the Firebase scripts for service workers
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging.js"
);

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
});

// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function (payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png", // Change this to your icon
  };

  // Show the notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});
