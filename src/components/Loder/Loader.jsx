import React, { useState, useEffect } from "react";
import "../Loder/loader.css"; // Import CSS for the loader

const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  // Simulate loading progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setLoading(false); // Hide loader when progress reaches 100%
          return 100;
        }
        return prev + 10;
      });
    }, 100); // Update every 500ms

    return () => clearInterval(timer); // Clear the interval on component unmount
  }, []);

  return (
    loading && (
      <div className="line-loader-container">
        <div className="line-loader" style={{ width: `${progress}%` }}></div>
      </div>
    )
  );
};

export default Loader;
