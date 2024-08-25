import { Route, Routes, useLocation } from "react-router-dom";
import "./App.scss";
import SignUp from "./SignUp";
import Home from "./Home";
import { userState } from "./UserStateContext";
import { useEffect, useState, useContext } from "react";
import Login from "./Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Profile from "./Profile";
import NavbarComponent from "./NavbarComponent";
import AdminReportDashboard from "./AdminReportDashboard";
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

  return (
    <userState.Provider value={{ userName, setUserName, center, setCenter }}>
      {checkUrl && <NavbarComponent />}
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/reports" element={<AdminReportDashboard />} />
        <Route
          path="/emergency-contacts"
          element={<EmergencyContacts />} // Add the emergency contacts route
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
