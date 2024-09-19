import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { MdHelpOutline } from "react-icons/md";
import { FaCartPlus } from "react-icons/fa";
import Badge from "@mui/material/Badge";

import "./header.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../Loder/Loader";

const Header = ({
  badgeCounter,
  setSidebar,
  searchValue,
  handleSearch,
  handleOffer,
}) => {
  const [isInput, setIsInput] = useState(false);

  const handleInputShow = () => {
    setIsInput((prev) => !prev);
  };
  return (
    <>
      <header>
        <div className="logo">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png"
            alt=""
          />
        </div>
        <nav>
          <ul>
            <li onClick={handleInputShow}>
              <IoSearchOutline />
              <p>Search</p>
            </li>
            <li onClick={() => handleOffer("offer")}>
              <BiSolidOffer />
              <p>Offer</p>
            </li>
            <li>
              <Link to="/help">
                <MdHelpOutline />
                <p>Help</p>
              </Link>
            </li>
            <Badge
              badgeContent={badgeCounter}
              color="primary"
              componentsProps={{
                badge: {
                  style: {
                    color: "white",
                    fontSize: "1vw",
                    border: "2px solid white",
                    width: "-.2vw",
                    height: "-.2vw",
                    top: "-.2vw",
                  },
                },
              }}
            >
              <li onClick={() => setSidebar(true)}>
                <FaCartPlus />
                <p>Cart</p>
              </li>
            </Badge>
          </ul>
        </nav>
      </header>
      <div className="input_box" style={{ height: isInput ? "50px" : "0" }}>
        <input
          type="text"
          placeholder="search item here.."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </>
  );
};

export default Header;
