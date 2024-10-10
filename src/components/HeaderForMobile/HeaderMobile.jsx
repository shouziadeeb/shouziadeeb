import React, { useEffect, useState } from "react";
import "./headerMobile.css";
import { FaUserCircle, FaLocationArrow } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const HeaderMobile = ({ handleSearch, searchValue }) => {
  const [inputPlaceholder, setInputPlaceholder] = useState(0);
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();
  const inputArray = ["Pizza", "Burger", "Momo", "Ice Cream"];
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
     setTimeout(() => {
        setAnimate(false); // End animation after 500ms
        setInputPlaceholder((prev) =>
          prev >= inputArray.length - 1 ? 0 : prev + 1
        );
      }, 500);
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [inputArray.length]);
  return (
    <div className="header">
      <div className="header_content">
        <div className="addrs_and_user">
          <p>
            <FaLocationArrow /> Amroha
          </p>
          <div className="user_icon" onClick={() => navigate("/login")}>
            <FaUserCircle />
          </div>
        </div>
        <div className="search_input">
          <input
            type="text"
            placeholder={`Search for "${inputArray[inputPlaceholder]}"`}
            className={`input-placeholder ${animate ? "slide-up" : ""}`}
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="icons">
            <span>
              <IoIosSearch />
            </span>
          </div>
        </div>
        <div className="heading_and_img">
          <h6>Book now and enjoy with crasiest deals and offers </h6>
          <h4>STEAL DEALS!</h4>
          <p>Starting at ₹39</p>

          {/* <div>
            <img src="src\assets\Food Delivery.png" />
          </div> */}
        </div>
        <div className="para">
          <p>delivery will be free on order above ₹159</p>
        </div>
      </div>
    </div>
  );
};

export default HeaderMobile;
