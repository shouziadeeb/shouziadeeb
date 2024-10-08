import React, { useState, useEffect } from "react";
import "./suggest.css";
import { RiArrowDropDownFill } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // styling for skeleton

const Suggest = ({
  foodList,
  handleFilterCatoegory,
  isFilterAdded,
  handlePrice,
  handleCategory,
}) => {
  const [state, setState] = useState(false);
  const [isPrice, setisPrice] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const priceArr = [
    { range: "49 - 149", max: 149, min: 49 },
    { range: "150 - 249", max: 249, min: 149 },
    { range: "250 - 349", max: 349, min: 249 },
    { range: "350 - 500", max: 449, min: 349 },
  ];

  // Simulate loading with useEffect (you can replace this with actual API logic)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after 2 seconds
    }, 2000);
    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <>
      <section className="suggestion_section">
        <div className="food_boxes">
          {foodList?.map((foodItem) => {
            // Display skeleton while loading
            if (foodItem.unique)
              return isLoading ? (
                <div className="box" key={foodItem.id}>
                  {/* Responsive Skeleton Loader */}
                  <Skeleton
                    width={"11vw"} // Adjust skeleton size to match the box size
                    height={"11vw"}
                    style={{
                      borderRadius: "50%", // Circular skeleton for the image
                    }}
                  />
                  <Skeleton
                    width={"80%"} // Responsive text skeleton width
                    height={"1.5vw"}
                    style={{ margin: "1vw 0" }}
                  />
                </div>
              ) : (
                <div
                  className={`box ${
                    activeItem === foodItem.id ? "active" : ""
                  }`}
                  onClick={() => {
                    handleCategory(foodItem.unique);
                    setActiveItem(foodItem.id);
                  }}
                  key={foodItem.id}
                >
                  <img
                    src={foodItem.img}
                    alt={foodItem.unique}
                    className={activeItem === foodItem.id ? "imgactive" : ""}
                  />
                  <p>{foodItem.unique}</p>
                </div>
              );
          })}
        </div>
        <div className="filter_btn_div">
          <div
            className="filter_price "
            onClick={() => {
              setState((prev) => !prev);
            }}
          >
            <div className="dropown">
              {isPrice ? isPrice : "Price"} <RiArrowDropDownFill />
            </div>
            <div
              className="dropdown_box"
              style={{
                display: state && "block",
              }}
            >
              {priceArr.map((item, index) =>
                isLoading ? (
                  <Skeleton
                    width={"100%"} // Responsive dropdown skeleton
                    height={"2vw"}
                    key={index}
                  />
                ) : (
                  <p
                    key={index}
                    onClick={() => {
                      handlePrice(item.min, item.max);
                      setisPrice(item.range);
                    }}
                  >
                    {item.range}
                  </p>
                )
              )}
            </div>
          </div>
          <div
            className="all_items"
            onClick={() => {
              handleFilterCatoegory("");
              setActiveItem(null);
              setisPrice(null);
            }}
          >
            <p>{isFilterAdded ? "Show all?" : "All items here"}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Suggest;
