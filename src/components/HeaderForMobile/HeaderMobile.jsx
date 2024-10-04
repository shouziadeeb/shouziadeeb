import React from "react";
import "./headerMobile.css";
import { FaUserCircle, FaLocationArrow } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const HeaderMobile = ({ handleSearch, searchValue }) => {
  const navigate = useNavigate();
  const item = "pizza";
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
            placeholder={`Search for item...`}
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
