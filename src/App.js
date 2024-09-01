// import React, { useEffect, useState, useContext } from "react";
// import { Route, Routes, useLocation } from "react-router-dom";
// import "./App.scss";
// import SignUp from "./SignUp";
// import Home from "./Home";
// import { userState } from "./UserStateContext";
// import Login from "./Login";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer, toast } from "react-toastify"; // Import toast for notifications
// import Profile from "./Profile";
// import NavbarComponent from "./NavbarComponent";
// import ReportDashboard from "./ReportDashboard";
// import EmergencyContacts from "./EmergencyContact";
// import { messaging } from "./FirebaseConfig"; // Import Firebase messaging
// import { onMessage } from "firebase/messaging"; // Import onMessage from Firebase

// function App() {
//   const [userName, setUserName] = useState("");
//   const [checkUrl, setCheckUrl] = useState(false);
//   const [center, setCenter] = useState();
//   const url = useLocation();
//   const userContext = useContext(userState);

//   useEffect(() => {
//     if (url.pathname === "/home" || url.pathname === "/profile") {
//       setCheckUrl(true);
//     } else {
//       setCheckUrl(false);
//     }
//   }, [url.pathname]);

//   useEffect(() => {
//     if (userContext && userContext.userName) {
//       setUserName(userContext.userName);
//     }
//   }, [userContext]);

//   // Effect to handle incoming FCM messages in the foreground
//   useEffect(() => {
//     const unsubscribe = onMessage(messaging, (payload) => {
//       console.log("Message received in foreground: ", payload);
//       toast.info(`Notification: ${payload.notification.title}`, {
//         position: toast.POSITION.TOP_RIGHT,
//         autoClose: 5000,
//       });
//     });

//     // Cleanup on unmount
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   return (
//     <userState.Provider value={{ userName, setUserName, center, setCenter }}>
//       {checkUrl && <NavbarComponent />}
//       <Routes>
//         <Route path="/" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/home" element={<Home />} />
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/admin/reports" element={<ReportDashboard />} />
//         <Route
//           path="/emergency-contacts"
//           element={<EmergencyContacts />} // Add the emergency contacts route
//         />
//       </Routes>
//       <ToastContainer
//         position="top-center"
//         autoClose={5000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="dark"
//       />
//     </userState.Provider>
//   );
// }

// export default App;

import React, { useEffect, useState, useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import SignUp from "./SignUp";
import Home from "./Home";
import { userState } from "./UserStateContext";
import Login from "./Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify"; // ToastContainer for notifications
import Profile from "./Profile";
import NavbarComponent from "./NavbarComponent";
import ReportDashboard from "./ReportDashboard";
import EmergencyContacts from "./EmergencyContact";

function App() {
  const [userName, setUserName] = useState("");
  const [checkUrl, setCheckUrl] = useState(false);
  const [center, setCenter] = useState();
  const url = useLocation();
  const userContext = useContext(userState);

  useEffect(() => {
    if (url.pathname === "/home" || url.pathname === "/profile") {
      setCheckUrl(true);
    } else {
      setCheckUrl(false);
    }
  }, [url.pathname]);

  useEffect(() => {
    if (userContext && userContext.userName) {
      setUserName(userContext.userName);
    }
  }, [userContext]);

  // Removed the FCM useEffect that was handling incoming messages

  return (
    <userState.Provider value={{ userName, setUserName, center, setCenter }}>
      {checkUrl && <NavbarComponent />}
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/reports" element={<ReportDashboard />} />
        <Route
          path="/emergency-contacts"
          element={<EmergencyContacts />} // Emergency contacts route
        />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </userState.Provider>
  );
}

export default App;
