// import React from "react";
// import { Form, Button } from "react-bootstrap";
// import { useRef } from "react";
// import {
//   sendPasswordResetEmail,
//   signInWithEmailAndPassword,
// } from "firebase/auth";
// import { authentication } from "./FirebaseConfig";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import requestPermissionAndStoreToken from "./requestPermissionAndStoreToken"; // Import FCM utility

// const Login = () => {
//   const email = useRef(null);
//   const password = useRef(null);
//   const navigate = useNavigate();

//   const SubmitForm = async (e) => {
//     e.preventDefault();
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         authentication,
//         email.current.value,
//         password.current.value
//       );
//       const user = userCredential.user;
//       await requestPermissionAndStoreToken(user.uid); // Store FCM token after login
//       navigate("/home");
//       toast.success("Welcome Citizen");
//     } catch (error) {
//       console.error("Login Error:", error); // Log the error for debugging
//       const errorCode = error.code;
//       toast.error(
//         errorCode === "auth/invalid-email"
//           ? "Invalid Email"
//           : errorCode === "auth/user-not-found"
//           ? "No Account with this Email"
//           : errorCode === "auth/wrong-password"
//           ? "Wrong Password"
//           : "Something's not right"
//       );
//     }
//   };

//   const passwordReset = async () => {
//     if (!email.current.value) {
//       toast.error("Please enter your email address first");
//       return;
//     }
//     try {
//       await toast.promise(
//         sendPasswordResetEmail(authentication, email.current.value),
//         {
//           pending: "Sending a reset Link",
//           success: "Reset link sent to email",
//           error: "Something's not right",
//         }
//       );
//     } catch (error) {
//       console.error("Password Reset Error:", error); // Log the error for debugging
//     }
//   };

//   return (
//     <div className="row mx-auto bg-light vh-100 text-dark">
//       <div className="col-sm-5 my-auto col-12 mx-auto">
//         <Form
//           className="w-75 mx-auto mt-5 d-flex flex-column gap-4"
//           onSubmit={SubmitForm}
//         >
//           <div>
//             <h2 className="text-center py-4">Welcome Back Citizen!</h2>
//             <h4 className="text-center text-decoration-underline">Log In</h4>
//           </div>

//           <Form.Group>
//             <Form.Control
//               type="text"
//               placeholder="Email.."
//               ref={email}
//               required
//               className="py-3"
//             />
//           </Form.Group>
//           <Form.Group>
//             <Form.Control
//               type="password"
//               placeholder="Password.."
//               ref={password}
//               required
//               className="py-3"
//             />
//             <p className="mt-3">
//               An Emergency Report?{" "}
//               <Link to="/home" className="fw-bold">
//                 Click here
//               </Link>
//             </p>
//           </Form.Group>
//           <Button type="submit" className="mt-3 py-3">
//             Log In
//           </Button>
//         </Form>
//         <div className="text-center mt-3">
//           New Here?
//           <Link
//             to="/"
//             className="text-decoration-none fw-bold mx-1 text-danger ms-2"
//           >
//             Create Account
//           </Link>
//         </div>
//         <div className="text-center mt-4">
//           Forgot Password?
//           <span
//             className="fw-bolder ms-2"
//             role="button"
//             onClick={passwordReset}
//           >
//             Click Here
//           </span>
//         </div>
//       </div>

//       <div
//         className="col-6 shadow-sm d-none d-sm-flex px-0 vh-100 justify-content-center align-items-center py-5 text-light"
//         style={{
//           backgroundImage: `url(
//             " https://images.unsplash.com/photo-1592514727890-8286ab197060?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80"
//           )`,
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundColor: "rgba(0,0,0,0.5)",
//           backgroundBlendMode: "saturation",
//         }}
//       >
//         <div className="px-5">
//           <h1 className="text-light text-center">
//             Reducing Crimes and Saving Lives
//           </h1>
//           <p className="text-center px-5 text-secondary ">
//             Report any <span className="text-danger">Crime</span> you see to the
//             police. Do not hesitate to do so. A crime reported is a life saved
//           </p>{" "}
//           <Button
//             className="text-center mx-auto d-flex bg-danger border-0 mt-5"
//             onClick={() => navigate("/home")}
//           >
//             Report an Emergency
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React from "react";
import { Form, Button } from "react-bootstrap";
import { useRef } from "react";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authentication } from "./FirebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const email = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();

  const SubmitForm = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(
        authentication,
        email.current.value,
        password.current.value
      );
      navigate("/home");
      toast.success("Welcome Citizen");
    } catch (error) {
      console.error("Login Error:", error); // Log the error for debugging
      const errorCode = error.code;
      toast.error(
        errorCode === "auth/invalid-email"
          ? "Invalid Email"
          : errorCode === "auth/user-not-found"
          ? "No Account with this Email"
          : errorCode === "auth/wrong-password"
          ? "Wrong Password"
          : "Something's not right"
      );
    }
  };

  const passwordReset = async () => {
    if (!email.current.value) {
      toast.error("Please enter your email address first");
      return;
    }
    try {
      await toast.promise(
        sendPasswordResetEmail(authentication, email.current.value),
        {
          pending: "Sending a reset Link",
          success: "Reset link sent to email",
          error: "Something's not right",
        }
      );
    } catch (error) {
      console.error("Password Reset Error:", error); // Log the error for debugging
    }
  };

  return (
    <div className="row mx-auto bg-light vh-100 text-dark">
      <div className="col-sm-5 my-auto col-12 mx-auto">
        <Form
          className="w-75 mx-auto mt-5 d-flex flex-column gap-4"
          onSubmit={SubmitForm}
        >
          <div>
            <h2 className="text-center py-4">Welcome Back Citizen!</h2>
            <h4 className="text-center text-decoration-underline">Log In</h4>
          </div>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Email.."
              ref={email}
              required
              className="py-3"
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Password.."
              ref={password}
              required
              className="py-3"
            />
            <p className="mt-3">
              An Emergency Report?{" "}
              <Link to="/home" className="fw-bold">
                Click here
              </Link>
            </p>
          </Form.Group>
          <Button type="submit" className="mt-3 py-3">
            Log In
          </Button>
        </Form>
        <div className="text-center mt-3">
          New Here?
          <Link
            to="/"
            className="text-decoration-none fw-bold mx-1 text-danger ms-2"
          >
            Create Account
          </Link>
        </div>
        <div className="text-center mt-4">
          Forgot Password?
          <span
            className="fw-bolder ms-2"
            role="button"
            onClick={passwordReset}
          >
            Click Here
          </span>
        </div>
      </div>

      <div
        className="col-6 shadow-sm d-none d-sm-flex px-0 vh-100 justify-content-center align-items-center py-5 text-light"
        style={{
          backgroundImage: `url(
            " https://images.unsplash.com/photo-1592514727890-8286ab197060?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=740&q=80"
          )`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(0,0,0,0.5)",
          backgroundBlendMode: "saturation",
        }}
      >
        <div className="px-5">
          <h1 className="text-light text-center">
            Reducing Crimes and Saving Lives
          </h1>
          <p className="text-center px-5 text-secondary ">
            Report any <span className="text-danger">Crime</span> you see to the
            police. Do not hesitate to do so. A crime reported is a life saved
          </p>{" "}
          <Button
            className="text-center mx-auto d-flex bg-danger border-0 mt-5"
            onClick={() => navigate("/home")}
          >
            Report an Emergency
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
