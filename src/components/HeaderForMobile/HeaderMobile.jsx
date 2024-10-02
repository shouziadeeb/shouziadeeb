import React from "react";
import "./headerMobile.css";
import { FaUserCircle, FaLocationArrow } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

const HeaderMobile = ({ handleSearch, searchValue }) => {
  const item = "pizza";
  return (
    <div className="header">
      <div className="addrs_and_user">
        <p>
          <FaLocationArrow /> Amroha
        </p>
        <div className="user_icon">
          <FaUserCircle />
        </div>
      </div>
      <div className="search_input">
        <input
          type="text"
          placeholder={`Search for ${item}`}
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
        <div>
          <h4>STEAL DEALS!</h4>
          <p>Starting at ₹39</p>
        </div>
        <div>
          <img src="src\assets\images\Chef_icon.svg.png" alt="chef icon" />
        </div>
      </div>
      <div className="para">
        <p>delivery will be free on order above ₹159</p>
      </div>
    </div>
  );
};

export default HeaderMobile;
