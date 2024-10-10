import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import "./address.css";
import { IoHomeOutline } from "react-icons/io5";
import { PiSuitcaseSimpleThin } from "react-icons/pi";
import { Link } from "react-router-dom";

import { IoMdClose } from "react-icons/io";
import { json } from "react-router-dom";
const Address = ({ showAddress, setshowAddress }) => {
  const [showForm, setShowForm] = useState(false);
  // const [address, setAddress] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [storedUser, setStoredUser] = useState(() => {
    const storedAddress = localStorage.getItem("storedAddress");
    return storedAddress ? JSON.parse(storedAddress) : [];
  });
  const addressRef = useRef();
  const doorRef = useRef();
  const landmarkRef = useRef();
  const handleAddress = (e) => {
    e.preventDefault();
    const addressValue = addressRef.current.value;
    const doorValue = doorRef.current.value;
    const landmarkValue = landmarkRef.current.value;

    const to_storeAddress = {
      home: selectedType,
      address: addressValue,
      door: doorValue,
      landmark: landmarkValue,
    };

    setStoredUser((prev) => [...prev, to_storeAddress]);

    addressRef.current.value = "";
    doorRef.current.value = "";
    landmarkRef.current.value = "";
    setShowForm(false);
  };
  const handleFormDisplay = () => {
    setShowForm(true);
  };

  const handlePayment = (obj) => {};

  const handleFilterAddress = (value) => {
    const filteredAddress = storedUser.filter(
      (item) => item.door !== value.door
    );
    setStoredUser(filteredAddress);
  };

  useEffect(() => {
    localStorage.setItem("storedAddress", JSON.stringify(storedUser));
  }, [storedUser]);
  return (
    <main>
      <div className="my_container">
        <div
          className="address_box"
          style={{ display: showForm ? "flex" : "none" }}
        >
          <form onSubmit={handleAddress}>
            <input
              type="text"
              required
              placeholder="Address"
              ref={addressRef}
            />
            <input
              type="text"
              required
              placeholder="Door/ Flat No."
              ref={doorRef}
            />
            <input
              type="text"
              required
              placeholder="Landmark"
              ref={landmarkRef}
            />
            <div className="home_work">
              <div
                className="location"
                onClick={() => {
                  setSelectedType("HOME");
                }}
              >
                <span>
                  <IoHomeOutline />
                </span>{" "}
                <span>Home</span>{" "}
              </div>
              <div className="location" onClick={() => setSelectedType("WORK")}>
                <span>
                  <PiSuitcaseSimpleThin />
                </span>{" "}
                <span>Work</span>
              </div>
            </div>
            <button type="submit">SAVE ADDRESS & PROCEEED</button>
          </form>
        </div>

        <div className="address_div">
          {storedUser.map((addr, index) => {
            return (
              <div className="adddress_on_display" key={index}>
                <div className="content_icon">
                  {addr.home && (
                    <div className="location_content">
                      {addr.home === "HOME" && (
                        <span>
                          <IoHomeOutline />
                        </span>
                      )}
                      {addr.home === "WORK" && (
                        <span>
                          <PiSuitcaseSimpleThin />
                        </span>
                      )}
                    </div>
                  )}
                </div>
                <div className="right_content">
                  {addr.home && (
                    <h2 style={{ fontWeight: "600", color: "black" }}>
                      {addr.home}
                    </h2>
                  )}
                  {addr.address && <p>{addr.address}</p>}
                  {addr.door && <p>{addr.door}</p>}
                  {addr.landmark && <p>{addr.landmark}</p>}
                  <div className="deliver_and_delete_button">
                    <Link to="/pay">
                      <button onClick={() => handlePayment(addr)}>
                        DELIVER HERE
                      </button>
                    </Link>
                    <button
                      className="delete_button"
                      onClick={() => handleFilterAddress(addr)}
                      style={{ background: "red" }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <button onClick={handleFormDisplay}>+ ADD NEW ADDRESS</button>
        </div>
      </div>
      <Outlet />
    </main>
  );
};

export default Address;
