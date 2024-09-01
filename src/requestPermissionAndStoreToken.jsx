// import { getMessaging, getToken } from "firebase/messaging";
// import { doc, setDoc } from "firebase/firestore";
// import { db } from "./FirebaseConfig";

// const requestPermissionAndStoreToken = async (userUid) => {
//   try {
//     const messaging = getMessaging();
//     const currentToken = await getToken(messaging, {
//       vapidKey: "BEJL96iyPT2mY0K8En4GgtmVzdYswhOoUYsoGAMDn6n",
//     });

//     if (currentToken) {
//       console.log("FCM Token:", currentToken);

//       // Store the FCM token directly in the user's document in the 'users' collection
//       await setDoc(
//         doc(db, "users", userUid),
//         { fcmToken: currentToken },
//         { merge: true } // This ensures we don't overwrite existing data
//       );
//       console.log("FCM token stored in user's Firestore document.");
//     } else {
//       console.log(
//         "No registration token available. Request permission to generate one."
//       );
//     }
//   } catch (error) {
//     console.error("An error occurred while retrieving token. ", error);
//   }
// };

// export default requestPermissionAndStoreToken;
