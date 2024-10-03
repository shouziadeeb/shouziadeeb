import React, { useState } from "react";
import "./suggest.css";
import { RiArrowDropDownFill } from "react-icons/ri";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // styling for skeleton

const Suggest = ({
  foodList,
  handleFilterCatoegory,
  isFilterAdded,
  handlePrice,
}) => {
  const [state, setState] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const priceArr = [
    { range: "49 - 149", max: 149, min: 49 },
    { range: "150 - 249", max: 249, min: 149 },
    { range: "250 - 349", max: 349, min: 249 },
    { range: "350 - 500", max: 449, min: 349 },
  ];
  return (
    <>
      <section className="suggestion_section">
        <div className="food_boxes">
          {foodList?.map((foodItem) => {
            if (foodItem.unique)
              return isLoading ? (
                <Skeleton width={100} height={100} borderRadius={50} />
              ) : (
                <div
                  className="box"
                  onClick={() => handleFilterCatoegory(foodItem.unique)}
                  key={foodItem.id}
                >
                  <img src={foodItem.img} />
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
              Price <RiArrowDropDownFill />
            </div>
            <div
              className="dropdown_box"
              style={{
                display: state && "block",
                height: state && "7.1vw",
              }}
            >
              {priceArr.map((item, index) => (
                <p key={index} onClick={() => handlePrice(item.min, item.max)}>
                  {item.range}
                </p>
              ))}
            </div>
          </div>
          <div className="all_items" onClick={() => handleFilterCatoegory("")}>
            <p>{isFilterAdded ? "Show all?" : "All items here"}</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Suggest;
