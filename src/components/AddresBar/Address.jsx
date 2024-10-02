import React, { useRef, useState } from "react";
import "./address.css";
import { IoHomeOutline } from "react-icons/io5";
import { PiSuitcaseSimpleThin } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";
const Address = ({ showAddress, setshowAddress }) => {
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const addressRef = useRef();
  const doorRef = useRef();
  const landmarkRef = useRef();
  const handleAddress = (e) => {
    e.preventDefault();
    const addressValue = addressRef.current.value;
    const doorValue = doorRef.current.value;
    const landmarkValue = landmarkRef.current.value;

    setAddress((prev) => [
      ...prev, // Keep the previous addresses
      {
        home: selectedType,
        address: addressValue, // Add new address object
        door: doorValue,
        landmark: landmarkValue,
      },
    ]);
    addressRef.current.value = "";
    doorRef.current.value = "";
    landmarkRef.current.value = "";
    setShowForm(false);
  };
  const handleFormDisplay = () => {
    setShowForm(true);
  };

  const handleLocation = (e) => {};
  const handlePayment = (obj) => {
    console.log(obj);
  };

  console.log(address);
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
          {address.map((addr, index) => {
            return (
              <div className="adddress_on_display">
                <div key={index} className="content_icon">
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
                    <p style={{ fontWeight: "600" }}>{addr.home}</p>
                  )}
                  {addr.address && <p>{addr.address}</p>}
                  {addr.door && <p>{addr.door}</p>}
                  {addr.landmark && <p>{addr.landmark}</p>}
                  <button
                    className="deliver_button"
                    onClick={() => handlePayment(addr)}
                  >
                    DELIVER HERE
                  </button>
                </div>
              </div>
            );
          })}
          <button onClick={handleFormDisplay}>+ ADD NEW ADDRESS</button>
        </div>
      </div>
    </main>
  );
};

export default Address;
