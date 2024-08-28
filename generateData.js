const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");
const { faker } = require("@faker-js/faker"); // Importing @faker-js/faker

// Initialize Firebase (use your Firebase project config here)
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
const db = getFirestore(app);

const locations = [
  {
    location: "Oforikrom Municipal District",
    state: "Ashanti Region",
    latitude: 6.67,
    longitude: -1.57,
  },
  {
    location: "Accra Metropolitan District",
    state: "Greater Accra Region",
    latitude: 5.614818,
    longitude: -0.205874,
  },
  {
    location: "Bolgatanga Municipal",
    state: "Upper East Region",
    latitude: 10.061716,
    longitude: -2.507987,
  },
  {
    location: "Tema Metropolitan District",
    state: "Greater Accra Region",
    latitude: 6.13604,
    longitude: -0.271126,
  },
  {
    location: "Kumasi Metropolitan District",
    state: "Ashanti Region",
    latitude: 6.716667,
    longitude: -1.583333,
  },
  {
    location: "Sekondi-Takoradi Metropolitan",
    state: "Western Region",
    latitude: 5.113826,
    longitude: -1.243272,
  },
  {
    location: "Tamale Metropolitan District",
    state: "Northern Region",
    latitude: 9.458109,
    longitude: -0.774171,
  },
  {
    location: "Cape Coast Metropolitan District",
    state: "Central Region",
    latitude: 5.928365,
    longitude: -0.987187,
  },
  {
    location: "Sunyani Municipal",
    state: "Bono Region",
    latitude: 7.186024,
    longitude: -2.326326,
  },
  {
    location: "Wa Municipal",
    state: "Upper West Region",
    latitude: 8.240532,
    longitude: -0.064149,
  },
  {
    location: "Ejisu-Juaben Municipal District",
    state: "Ashanti Region",
    latitude: 6.892045,
    longitude: -1.365926,
  },
  {
    location: "Ho Municipal",
    state: "Volta Region",
    latitude: 6.6,
    longitude: -0.466667,
  },
  {
    location: "Techiman Municipal",
    state: "Bono East Region",
    latitude: 7.583333,
    longitude: -1.933333,
  },
  {
    location: "Koforidua Municipal",
    state: "Eastern Region",
    latitude: 6.092501,
    longitude: -0.259103,
  },
  {
    location: "Obuasi Municipal District",
    state: "Ashanti Region",
    latitude: 6.2,
    longitude: -1.666667,
  },
];

const incidentDescriptions = {
  "Armed Robbery": () =>
    `A group of ${faker.string.numeric(
      1
    )} armed men robbed ${faker.company.name()} at gunpoint.`,
  Burglary: () =>
    `The residence of ${faker.person.fullName()} was broken into and valuables were stolen.`,
  Assault: () =>
    `${faker.person.fullName()} was physically attacked by an unknown assailant in ${faker.location.street()}.`,
  "Car Theft": () =>
    `A ${faker.vehicle.vehicle()} was stolen from ${faker.location.street()} parking lot.`,
  Vandalism: () =>
    `Public property at ${faker.location.street()} was defaced with graffiti.`,
  Arson: () =>
    `A fire was deliberately set at ${faker.company.name()} causing significant damage.`,
  "Domestic Violence": () =>
    `A domestic dispute escalated into violence at the residence of ${faker.person.fullName()}.`,
  Kidnapping: () =>
    `${faker.person.fullName()} was abducted from ${faker.location.street()} by unknown individuals.`,
  Fraud: () =>
    `Fraudulent transactions were reported at ${faker.company.name()}.`,
  Homicide: () =>
    `A body was found at ${faker.location.street()}, suspected to be a homicide.`,
  "Drug Trafficking": () =>
    `A large quantity of illegal substances was seized at ${faker.location.street()}.`,
  Rape: () =>
    `An individual was assaulted at ${faker.location.street()} and the case is under investigation.`,
  Cybercrime: () =>
    `Cybercriminals hacked into the systems of ${faker.company.name()} and stole sensitive data.`,
  "Human Trafficking": () =>
    `A suspected human trafficking operation was uncovered at ${faker.location.street()}.`,
  "Illegal Mining": () =>
    `Illegal mining activities were reported in the vicinity of ${faker.location.city()}.`,
  "Environmental Pollution": () =>
    `Pollution from a nearby factory has contaminated water sources in ${faker.location.city()}.`,
  "Public Disturbance": () =>
    `A large crowd gathered at ${faker.location.street()} causing a public disturbance.`,
  "Bribery and Corruption": () =>
    `A government official was caught accepting bribes at ${faker.company.name()}.`,
  Extortion: () =>
    `${faker.person.fullName()} was threatened and extorted by unknown individuals.`,
  Terrorism: () =>
    `A terrorist plot was foiled by authorities at ${faker.location.street()}.`,
};

function getRandomOffset() {
  const offset = Math.random() * 0.01 - 0.005; // Generates a small offset between -0.005 and 0.005
  return offset;
}

async function generateData() {
  for (let i = 0; i < 30; i++) {
    const incidentType = faker.helpers.arrayElement(
      Object.keys(incidentDescriptions)
    );
    const locationData = faker.helpers.arrayElement(locations);
    const isAnonymous = faker.datatype.boolean();

    // Apply small random offsets to latitude and longitude
    const latitude = parseFloat(locationData.latitude) + getRandomOffset();
    const longitude = parseFloat(locationData.longitude) + getRandomOffset();

    // Generate a recent date and extract just the time
    const recentDate = faker.date.recent();
    const timeString = recentDate.toLocaleTimeString();

    const report = {
      date: recentDate.toDateString(),
      incident: incidentType,
      incidentDescription: incidentDescriptions[incidentType](), // Get relevant description
      incidentLocation: {
        latitude: latitude.toFixed(6),
        longitude: longitude.toFixed(6),
      },
      location: locationData.location,
      phone: faker.phone.number(), // Correct method for generating phone numbers
      reporter: isAnonymous ? "Anonymous" : faker.person.firstName(), // Updated to use faker.person
      reporters_location: [latitude, longitude],
      state: locationData.state,
      time: timeString, // Use the extracted time string
    };

    try {
      await addDoc(collection(db, "Reported Cases"), report);
      console.log(`Document written with ID: ${i + 1}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}

generateData();
