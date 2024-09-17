import "./signIn.css";
import { IoMdClose } from "react-icons/io";
import React, { useRef } from "react";

export const SignIn = ({ sigInSidebar, setSignInSidebar, setUser }) => {
  const numberRef = useRef();
  const nameRef = useRef();
  const emailRef = useRef();

  const handleSignIndata = (e) => {
    e.preventDefault();
    const numberValue = numberRef.current.value;
    const nameValue = nameRef.current.value;
    const emailValue = emailRef.current.value;
    console.log(numberValue, nameValue, emailValue);

    const userValues = {
      number: numberValue,
      name: nameValue,
      email: emailValue,
    };

    localStorage.setItem("user", JSON.stringify(userValues));

    numberRef.current.value = "";
    nameRef.current.value = "";
    emailRef.current.value = "";

    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  };

  return (
    <div
      className="sighn_sidebar"
      style={{
        width: sigInSidebar && "100%",
      }}
    >
      <div className="signIn_page">
        <div className="text">
          <h3>Sign In ?</h3>
        </div>
        <div className="to_close" onClick={() => setSignInSidebar(false)}>
          <IoMdClose />
        </div>
        <form onSubmit={handleSignIndata}>
          <input type="number" placeholder="Number" ref={numberRef} required />
          <input type="text" placeholder="Name" ref={nameRef} required />
          <input type="email" placeholder="Email" ref={emailRef} required />
          <button type="submit">Sign in </button>
        </form>
      </div>
    </div>
  );
};
