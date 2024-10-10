import React, { useState, useEffect } from "react";
import "./myOrder.css";
import { useDispatch, useSelector } from "react-redux";
import { handleAllTotalPrice2, handleMyOrder } from "../../store/redux";
import Badge from "@mui/material/Badge";

const MyOrder = () => {
  const orderedData = useSelector((state) => state.cartList.myOrders);
  const totalAmount = useSelector((state) => state.cartList.AllTotal);
  const totalAmount2 = useSelector((state) => state.cartList.AllTotal2);
  const dispatch = useDispatch();

  const [deliveryTime, setDeliveryTime] = useState(""); // Time of delivery
  const [currentTime, setCurrentTime] = useState(""); // Current system time
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedDeliveryTime = localStorage.getItem("deliveryTime");

    const currentTime = new Date();
    const deliveryEstimate = new Date(currentTime.getTime() + 1 * 60000); // 2 minutes ahead
    const formattedDeliveryTime = deliveryEstimate.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    if (orderedData.length > 0) {
      setDeliveryTime(formattedDeliveryTime);
      localStorage.setItem("deliveryTime", formattedDeliveryTime);
    }
    // Save to localStorage
  }, [orderedData.length > 0]);

  console.log(totalAmount);
  console.log(totalAmount2);
  // Update current time every second and check for delivery
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setCurrentTime(formattedTime);

      if (formattedTime === deliveryTime) {
        dispatch(handleMyOrder([])); // Clear order
        dispatch(handleAllTotalPrice2(0)); // Clear order
        localStorage.removeItem("deliveryTime"); //
        setDeliveryTime("");
        clearInterval(interval); // Stop checking after delivery
        setIsModalOpen(true);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [deliveryTime, dispatch]);

  return (
    <div className="orderContainer">
      <h1>Order Details</h1>
      <div className="orderDetails">
        <div className="myOrder">
          {orderedData.length > 0 ? (
            orderedData.map((item, index) => (
              <div key={index} className="order_list">
                <div>
                  <h4>{item.name}</h4>
                  <p>Quantity: {item.qty}</p>
                  <p>Price: ₹{item.price}</p>
                </div>
                <hr />
              </div>
            ))
          ) : (
            <h2 style={{ margin: "2vw" }}>No Order</h2>
          )}
        </div>
        <div className="my_order_text">
          <h3>Total Amount: ₹{totalAmount2}</h3>
          <h3>
            Order Will be Delivered At:{" "}
            {orderedData.length > 0 ? deliveryTime : ""}
          </h3>
        </div>
      </div>
      <OrderDeliveredModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default MyOrder;

const OrderDeliveredModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Order Delivered!</h2>
        <p>Your order has been successfully delivered.</p>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
