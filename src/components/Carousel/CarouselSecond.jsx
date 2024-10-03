import React, { useState, useEffect } from "react";
import "../Carousel/carousel.css"; // External CSS for styling

const CarouselSecond = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const data = [
    {
      offer: "Get 10% OFF",
      para: "All items food",
      img: "https://www.eatingwell.com/thmb/m5xUzIOmhWSoXZnY-oZcO9SdArQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/article_291139_the-top-10-healthiest-foods-for-kids_-02-4b745e57928c4786a61b47d8ba920058.jpg",
    },
    {
      offer: "Get Now 40% OFF",
      para: "All items Thali",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkBYhLRokAIUadZ3Q0N2HTfi2gSkpVsEWOGQ&s",
    },
    {
      offer: "Get 30% OFF",
      para: "Buy combo and get offer",
      img: "https://static.vecteezy.com/system/resources/previews/001/349/636/non_2x/fast-food-menu-combo-template-free-vector.jpg",
    },
    {
      offer: "Get in ₹170",
      para: "Nice ice cream",
      img: "https://assets.tmecosys.com/image/upload/t_web767x639/img/recipe/ras/Assets/7C3748CF-C170-4EB7-9688-5A1E5A2523C2/Derivates/AC99F89F-64D0-483E-B9C4-3C534C0725CD.jpg",
    },
  ];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 3000); // Change slide every second

    return () => clearInterval(interval); // Clear interval when component unmounts
  }, [data.length]);

  return (
    <div className="CarouselSecond">
      <div className="Mycarousel">
        <div
          className="Mycarousel-slide"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`, // Uncommented this line
          }}
        >
          {data.map((item, index) => (
            <div key={index} className="carousel-item">
              <div className="carousel_text">
                <p className="para">{item.para}</p>
                <p className="offer">{item.offer}</p>
                <button>Order Now</button>
              </div>
              <img src={item.img} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CarouselSecond;
