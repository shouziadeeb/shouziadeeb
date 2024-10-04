import "./loginMobile.css";
import { IoMdClose } from "react-icons/io";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
export const LogInMobile = () => {
  const numberRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();
  const [localStorageUser, setlocalStorageUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : { number: "", name: "", email: "" };
  });

  const handleOnchangeInput = (e) => {
    const { name, value } = e.target;

    setlocalStorageUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignIndata = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(localStorageUser));
    // Perform other sign-in logic here
  };

  return (
    <div className="sigIn_sidebar1">
      <div className="signIn_page1">
        <form onSubmit={handleSignIndata}>
          <input
            type="number"
            name="number"
            placeholder="Number"
            value={localStorageUser ? localStorageUser.number : ""}
            ref={numberRef}
            onChange={(e) => {
              handleOnchangeInput(e);
            }}
            required
          />
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={localStorageUser ? localStorageUser.name : ""}
            ref={nameRef}
            onChange={(e) => {
              handleOnchangeInput(e);
            }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={localStorageUser ? localStorageUser.email : ""}
            ref={emailRef}
            onChange={(e) => {
              handleOnchangeInput(e);
            }}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};
