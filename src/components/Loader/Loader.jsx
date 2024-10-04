import React from "react";
import "../Loader/loader.css"; // Import the CSS for styling 

const Loader = () => {
  return (
    <div className="cube-loader">
      <div className="cube">
        <div className="side side1"></div>
        <div className="side side2"></div>
        <div className="side side3"></div>
        <div className="side side4"></div>
        <div className="side side5"></div>
        <div className="side side6"></div>
      </div>
      <p>Loading...</p>
    </div>
  );
};

export default Loader;
