// import React, { useEffect, useState } from "react";
// import { authentication } from "./FirebaseConfig";
// import { onAuthStateChanged, signOut } from "firebase/auth";
// import { Link, useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";

// const NavbarComponent = ({ getUser }) => {
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [userEmail, setUserEmail] = useState("");
//   const [userName, setUserName] = useState("");

//   useEffect(() => {
//     const func = () => {
//       onAuthStateChanged(authentication, (currentUser) => {
//         if (currentUser) {
//           setUserEmail(currentUser?.email);
//           setUserName(currentUser?.displayName);
//           setLoggedIn(true);
//         }
//       });
//     };
//     func();
//   }, []);

//   const navigate = useNavigate();

//   const logOut = (e) => {
//     e.preventDefault();
//     try {
//       signOut(authentication);
//       navigate("/login");
//     } catch (error) {
//       alert(error);
//     }
//   };

//   return (
//     <div className="ms-auto">
//       <button
//         className="btn btn-secondary"
//         type="button"
//         data-bs-toggle="offcanvas"
//         data-bs-target="#offcanvasRight"
//         aria-controls="offcanvasRight"
//       >
//         <i className="fa-solid fa-bars"></i>
//       </button>

//       {loggedIn ? (
//         <div
//           className="offcanvas offcanvas-end custom-offcanvas"
//           id="offcanvasRight"
//           aria-labelledby="offcanvasRightLabel"
//         >
//           <div className="offcanvas-header">
//             <h6 className="offcanvas-title" id="offcanvasRightLabel">
//               {userName}
//             </h6>
//             <button
//               type="button"
//               className="btn-close ms-5"
//               data-bs-dismiss="offcanvas"
//               aria-label="Close"
//             ></button>
//           </div>
//           <div className="text-center">
//             <div className="my-3 py-2">
//               <i className="fa-solid fa-house"></i>{" "}
//               <Link
//                 to="/home"
//                 className="text-center text-decoration-none text-secondary mx-4"
//               >
//                 Home
//               </Link>
//             </div>
//             <div className="my-3 py-2">
//               <i className="fa-solid fa-circle-info"></i>
//               <Link
//                 to="/profile"
//                 className="text-center text-decoration-none text-secondary mx-4"
//               >
//                 About
//               </Link>
//             </div>
//             <div className="my-3 py-2">
//               <i className="fa-solid fa-user"></i>
//               <Link
//                 to="/profile"
//                 className="text-center text-decoration-none text-secondary mx-4"
//               >
//                 Profile
//               </Link>
//             </div>

//             <div className="my-3 py-2">
//               <Button
//                 className="text-center bg-danger border border-0 shadow-sm"
//                 onClick={logOut}
//               >
//                 Log Out <i className="fa-solid fa-right-from-bracket"></i>
//               </Button>
//             </div>
//           </div>
//           <div className="text-center mt-4">
//             {" "}
//             <p className="fs-5">Actions</p>
//             <div className="my-1 ">
//               <i className="fa-solid fa-person-circle-exclamation"></i>
//               <Link
//                 to="/admin/reports" // Navigate to the reports dashboard
//                 className="text-center text-decoration-none text-secondary mx-4"
//               >
//                 Reports
//               </Link>
//             </div>
//             <div className="my-1 ">
//               <i className="fa-solid fa-phone"></i>
//               <Link
//                 to="/emergency-contacts" // Navigate to the emergency contacts list
//                 className="text-center text-decoration-none text-secondary mx-4"
//               >
//                 Emergency Contacts
//               </Link>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div
//           className="offcanvas offcanvas-end p-5 custom-offcanvas"
//           id="offcanvasRight"
//           aria-labelledby="offcanvasRightLabel"
//         >
//           <p>You need to log in first</p>
//           <Button
//             onClick={() => {
//               navigate("/");
//             }}
//           >
//             Log in
//           </Button>
//           <p className="text-center mt-5">
//             You can still Report a <br /> crime without Logging in
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NavbarComponent;

import React, { useEffect, useState } from "react";
import { authentication } from "./FirebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const NavbarComponent = ({ getUser }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authentication, (currentUser) => {
      if (currentUser) {
        setUserEmail(currentUser.email);
        setUserName(currentUser.displayName);
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
        setUserEmail("");
        setUserName("");
      }
    });
    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  const navigate = useNavigate();

  const logOut = async (e) => {
    e.preventDefault();
    try {
      await signOut(authentication);
      setLoggedIn(false); // Update state after logout
      navigate("/login");
    } catch (error) {
      console.error("Error during sign-out:", error);
      alert(error);
    }
  };

  return (
    <div className="ms-auto">
      <button
        className="btn btn-secondary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
        aria-label="Toggle navigation"
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      {loggedIn ? (
        <div
          className="offcanvas offcanvas-end custom-offcanvas"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <div className="offcanvas-header">
            <h6 className="offcanvas-title" id="offcanvasRightLabel">
              {userName}
            </h6>
            <button
              type="button"
              className="btn-close ms-5"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="text-center">
            <div className="my-3 py-2">
              <i className="fa-solid fa-house"></i>{" "}
              <Link
                to="/home"
                className="text-center text-decoration-none text-secondary mx-4"
              >
                Home
              </Link>
            </div>
            <div className="my-3 py-2">
              <i className="fa-solid fa-circle-info"></i>
              <Link
                to="/profile"
                className="text-center text-decoration-none text-secondary mx-4"
              >
                About
              </Link>
            </div>
            <div className="my-3 py-2">
              <i className="fa-solid fa-user"></i>
              <Link
                to="/profile"
                className="text-center text-decoration-none text-secondary mx-4"
              >
                Profile
              </Link>
            </div>

            <div className="my-3 py-2">
              <Button
                className="text-center bg-danger border border-0 shadow-sm"
                onClick={logOut}
              >
                Log Out <i className="fa-solid fa-right-from-bracket"></i>
              </Button>
            </div>
          </div>
          <div className="text-center mt-4">
            {" "}
            <p className="fs-5">Actions</p>
            <div className="my-1 ">
              <i className="fa-solid fa-person-circle-exclamation"></i>
              <Link
                to="/admin/reports"
                className="text-center text-decoration-none text-secondary mx-4"
              >
                Reports
              </Link>
            </div>
            <div className="my-1 ">
              <i className="fa-solid fa-phone"></i>
              <Link
                to="/emergency-contacts"
                className="text-center text-decoration-none text-secondary mx-4"
              >
                Emergency Contacts
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div
          className="offcanvas offcanvas-end p-5 custom-offcanvas"
          id="offcanvasRight"
          aria-labelledby="offcanvasRightLabel"
        >
          <p>You need to log in first</p>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Log in
          </Button>
          <p className="text-center mt-5">
            You can still Report a <br /> crime without Logging in
          </p>
        </div>
      )}
    </div>
  );
};

export default NavbarComponent;
