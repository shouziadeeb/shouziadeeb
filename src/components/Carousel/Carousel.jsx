import React, { useState, useEffect } from "react";
import "../Carousel/carousel.css";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    "https://dutchuncles.in/wp-content/uploads/2021/02/Untitled-2.jpg",
    "https://www.lirascreen.com/wp-content/uploads/2021/11/chicken-burger-tv-screen-menu.jpg",
    "https://miro.medium.com/v2/resize:fit:1400/1*iBebVuGHJ8Gqoo-LTzCbAg.png",
  ];

  // Autoplay logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Slide change every 3 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [images.length]);

  return (
    <div className="container">
      <div className="carousel-content">
        {images.map((image, index) => (
          <div
            key={index}
            className={
              index === currentIndex
                ? "carousel-slide active"
                : "carousel-slide"
            }
          >
            {index === currentIndex && (
              <img src={image} alt={`Slide ${index + 1}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
