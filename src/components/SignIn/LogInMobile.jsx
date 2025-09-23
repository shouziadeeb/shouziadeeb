import "./loginMobile.css";
import { IoMdClose } from "react-icons/io";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { useUser } from "../../hooks/useUser";

const notifySuccess = () => {
  toast.success(
    <div style={{ display: "flex", alignItems: "center" }}>
      {/* <FaCheckCircle style={{ marginRight: "10px", color: "green" }} /> */}
      Success! Your info is successfully completed.
    </div>,
    {
      position: "top-center",
      autoClose: 3000, // 3 seconds
    }
  );
};

export const LogInMobile = () => {
  const navigate = useNavigate();
  const numberRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const [localStorageUser, setlocalStorageUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : { number: "", name: "", email: "" };
  });
  const { logout } = useUser();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();

    navigate("/");
    setShowLogoutModal(false);
  };

  const handleOnchangeInput = (e) => {
    const { name, value } = e.target;

    setlocalStorageUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log("====================================");
  console.log(localStorageUser);
  console.log("====================================");
  const handleSignIndata = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(localStorageUser));
    // alert("Your Info is Successfully Updated");

    notifySuccess();
    // navigate("/");
  };

  return (
    <div className="sigIn_sidebar1">
      <div className="logout_btn">
        <button onClick={() => setShowLogoutModal(true)}>Logout</button>
        <ConfirmModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
          title="Logout Confirmation"
          message="Are you sure you want to logout?"
        />
      </div>
      <div className="text_info">
        <h2>Edit Your Information Here</h2>
        <p>
          Please fill in the required details below and click 'Submit' to save
          changes
        </p>
      </div>
      <div className="signIn_page1">
        <form onSubmit={handleSignIndata}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={localStorageUser ? localStorageUser.name : ""}
            ref={nameRef}
            onChange={(e) => {
              handleOnchangeInput(e);
            }}
            required
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={localStorageUser ? localStorageUser.email : ""}
            ref={emailRef}
            onChange={(e) => {
              handleOnchangeInput(e);
            }}
            required
          />
          {/* <input
            type="email"
            placeholder="Email"
            name="email"
            value={localStorageUser ? localStorageUser.email : ""}
            ref={emailRef}
            onChange={(e) => {
              handleOnchangeInput(e);
            }}
            required
          /> */}
          <button type="submit">Submit</button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
