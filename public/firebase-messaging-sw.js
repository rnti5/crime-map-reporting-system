/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
// Import the Firebase scripts for service workers
importScripts("https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/9.17.1/firebase-messaging.js"
);

// Initialize Firebase in the service worker
firebase.initializeApp({
  apiKey: "AIzaSyA-wQRiq6DAnukrgyisr7UlBWjPSbjJCOo",
  authDomain: "crime-report-5c09f.firebaseapp.com",
  projectId: "crime-report-5c09f",
  storageBucket: "crime-report-5c09f.appspot.com",
  messagingSenderId: "482196548122",
  appId: "1:482196548122:web:ca8e8031d8f1a1795a7fa3",
  measurementId: "G-LJFH54SRHK",
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
