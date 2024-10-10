import React, { useEffect, useState } from "react";
import "./payment.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  handleAllTotalPrice,
  handleAllTotalPrice2,
  handleMyOrder,
} from "../../store/redux";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const total = useSelector((state) => state.cartList.AllTotal);
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartList.items);
  const [selectedOption, setSelectedOption] = useState("");

  console.log(total);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedOption && cartData.length > 0) {
      cartData.map((item) => dispatch(handleMyOrder(item)));

      dispatch(handleAllTotalPrice(total));
      dispatch(handleAllTotalPrice2(total));
      dispatch(addToCart([]));
      setIsModalOpen(true);
    } else {
      alert("!Please select payment method");
    }
  };

  return (
    <div className="main_payment_container">
      <div className="payment-container">
        <h2>Checkout</h2>
        <div className="product-info">
          <h3>Product Information</h3>
          <div className="product_info">
            {cartData.length > 0 &&
              cartData.map((item) => (
                <div className="items_detail">
                  {" "}
                  <p>
                    <strong>Product:</strong> {item.name}
                  </p>
                  {
                    <p>
                      <strong>Quantity:</strong> {item.qty}
                    </p>
                  }
                  {/* <p>
                  <strong>Price:</strong> ${item.price}
                </p> */}
                  <hr />
                </div>
              ))}
          </div>
          <p>
            <strong>Total:</strong> ₹{total}
          </p>
        </div>
        {/* <div></div> */}
        <form>
          <div>
            <input
              type="radio"
              id="credit-card"
              name="payment"
              value="Credit Card"
              checked={selectedOption === "Credit Card"}
              onChange={handleOptionChange}
            />
            <label htmlFor="credit-card">Credit Card</label>
          </div>

          <div>
            <input
              type="radio"
              id="paypal"
              name="payment"
              value="PayPal"
              checked={selectedOption === "PayPal"}
              onChange={handleOptionChange}
            />
            <label htmlFor="paypal">PayPal</label>
          </div>

          <div>
            <input
              type="radio"
              id="bank-transfer"
              name="payment"
              value="Bank Transfer"
              checked={selectedOption === "Bank Transfer"}
              onChange={handleOptionChange}
            />
            <label htmlFor="bank-transfer">Bank Transfer</label>
          </div>
        </form>
        <button className="payment-button " onClick={handleSubmit}>
          Confirm Payment
        </button>
      </div>
      <OrderDeliveredModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Payment;

const OrderDeliveredModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <OrderConfirmed isConfirmed={isOrderConfirmed} />

        <div className="content_of_modal">
          <h2>Order Confirmed!</h2>
          <p>Your order will be delivered soon.</p>
          <button
            className="close-btn"
            onClick={() => {
              onClose();
              navigate("/");
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};
const OrderConfirmed = ({ isConfirmed }) => {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (isConfirmed) {
      setShowAnimation(true);
    }
  }, [isConfirmed]);

  return (
    <div className={`order-confirmation ${showAnimation ? "show" : ""}`}>
      <div className="checkmark-container">
        <svg
          className="checkmark"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 52 52"
        >
          <circle
            className="checkmark__circle"
            cx="26"
            cy="26"
            r="25"
            fill="none"
          />
          <path
            className="checkmark__check"
            fill="none"
            d="M14.1 27.2l7.1 7.2 16.7-16.8"
          />
        </svg>
      </div>
    </div>
  );
};
