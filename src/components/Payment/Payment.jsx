import React, { useEffect, useState } from "react";
import "./payment.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/redux";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const total = useSelector((state) => state.cartList.AllTotal);
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartList.items);
  const [selectedOption, setSelectedOption] = useState("");
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    postalCode: "",
    country: "",
  });

  const [product] = useState({
    name: "Wireless Headphones",
    quantity: 1,
    price: 150,
  });
  console.log(cartData);
  console.log(cartData);
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handlePayment = (e) => {
    e.preventDefault();
    // Here you would normally integrate with a payment gateway like Stripe/PayPal
    alert("Payment Successful");
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedOption && cartData.length > 0) {
      dispatch(addToCart([]));
      alert(
        `Your order will be delivered within 30 minutes Selected Payment Method: ${selectedOption}`
      );
      navigate("/");
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
    </div>
  );
};

export default Payment;
