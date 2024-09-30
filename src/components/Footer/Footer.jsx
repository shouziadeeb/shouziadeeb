import React from "react";
import "./footer.css";
import { SiSwiggy } from "react-icons/si";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <>
      <div className="download">
        <div className="para">
          <p>For better experience,download the Dummy app now</p>
        </div>
        <div className="visit_store">
          <div className="box">
            <div className="store">
              <img
                src="https://i.ytimg.com/vi/VRs8_vkfNiY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCODcbbblhNshsv-vDqEls_9QAjeg"
                alt=""
              />
            </div>
            <div className="store_name">
              <p>GET IT ON</p>
              <p>Google Play</p>
            </div>
          </div>
          <div className="box">
            <div className="store">
              <img
                style={{ width: "5vw" }}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCUX5Row2QfumC7m_1dDV0zsjMPHhkkVPfYg&s"
                alt=""
              />
            </div>
            <div className="store_name">
              <p>GET IT ON</p>
              <p>Google Play</p>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <div className="div1 ">
          <h3>
            <span>
              <SiSwiggy />
            </span>{" "}
            Swiggy
          </h3>
        </div>
        <div className="div2">
          <h3>Company</h3>
          <p>About</p>
          <p>Careers</p>
          <p>Team</p>
          <p>Swiggy One</p>
          <p>Swiggy Instamart</p>
        </div>
        <div className="div3">
          <div>
            <h3>Contact us</h3>
            <Link to="/help">
              {" "}
              <p style={{ color: "white" }}>Help & Support</p>
            </Link>
            <p>Partner with us</p>
            <p>Ride with us</p>
          </div>
          <div>
            <h3>Legal</h3>
            <p> Terms & Conditions</p>
            <p>Cookie Policy</p>
            <p>Privacy Policy</p>
            <p>Investor Relations</p>
          </div>
        </div>
        <div className="div4">
          <h3>We deliver to:</h3>
        </div>
      </footer>
    </>
  );
};
