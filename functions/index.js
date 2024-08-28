/* eslint-disable require-jsdoc */
/* eslint-disable indent */
/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.sendNotificationOnNewIncident = functions.firestore
  .document("Reported Cases/{caseId}")
  .onCreate(async (snapshot, context) => {
    const incident = snapshot.data();

    const usersSnapshot = await admin.firestore().collection("users").get();
    usersSnapshot.forEach(async (userDoc) => {
      const user = userDoc.data();
      if (user.location) {
        const distance = calculateDistance(
          incident.location.latitude,
          incident.location.longitude,
          user.location.latitude,
          // eslint-disable-next-line comma-dangle
          user.location.longitude
        );

        // Notify users within a 5 km radius of the incident
        if (distance <= 5) {
          const payload = {
            notification: {
              title: `New Incident Reported: ${incident.incident}`,
              body: `An incident has been reported near your location.`,
            },
          };

          if (user.fcmToken) {
            await admin.messaging().sendToDevice(user.fcmToken, payload);
          }
        }
      }
    });
  });

// Helper function to calculate distance between two geolocation points
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}
