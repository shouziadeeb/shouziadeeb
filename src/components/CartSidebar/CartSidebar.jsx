import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoLogInOutline } from "react-icons/io5";
import { FiUserPlus, FiUser } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa6";
import { useUser } from "../../hooks/useUser";
import { SignIn } from "../SignIn/SignIn";
import "./cartSidebar.css";
import { handleQuantity, handleAllTotalPrice } from "../../store/redux";
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ showCart, setShowCart }) => {
  const [allPrice, setAllPrice] = useState(0);
  const [Alltotal, setAllTotal] = useState(0);
  const { user, setUser, logout } = useUser();
  const [sigInSidebar, setSignInSidebar] = useState(false);

  const cartData = useSelector((state) => state.cartList.items);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const Cartwidth = showCart ? (windowWidth < 600 ? "100%" : "40%") : "0";

  // useEffect(() => {
  //   const handleResize = () => setWindowWidth(window.innerWidth);
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const updateCartQuantity = (item, number) => {
    dispatch(handleQuantity({ item, number }));
  };

  useEffect(() => {
    const total =
      cartData &&
      cartData.length > 0 &&
      cartData.reduce((acc, curValue) => acc + Number(curValue.totalPrice), 0);
    setAllPrice(total);
  }, [cartData]);

  useEffect(() => {
    if (cartData && cartData.length > 0) {
      const subTotal = Math.floor((allPrice * 5) / 100 + allPrice + 6 + 40);
      setAllTotal(subTotal);
    }
    if (!allPrice) setAllTotal(0);
  }, [allPrice]);

  const hanldeBuyItemButton = () => {
    if (user && cartData && cartData.length > 0) {
      navigate("/address");
    } else {
      if (cartData && cartData.length < 1) alert("Please add item in cart");
      else {
        alert("sign in fisrt");
      }
    }
  };
  const handleEmailSidebar = () => {
    setSignInSidebar(true);
  };

  useEffect(() => {
    dispatch(handleAllTotalPrice(Alltotal));
  }, [Alltotal]);

  console.log();
  return (
    <div className="cart_sidebar" style={{ width: Cartwidth }}>
      <nav>
        <div onClick={() => setShowCart(false)} className="to_close_cart">
          <FaArrowLeft />
        </div>
        {user ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              // width: "50%",
            }}
          >
            {/* <p style={{ fontSize: "3vw", cursor: "pointer" }} onClick={logout}>
              <IoLogInOutline />
            </p> */}
            <p style={{ display: "flex", gap: ".4vw", alignItems: "center" }}>
              <FiUser />
              <span style={{ fontWeight: "bolder" }}>{user.name}</span>
            </p>
          </div>
        ) : (
          <button onClick={handleEmailSidebar}>
            <span>
              <FiUserPlus />
            </span>{" "}
            Sign in
          </button>
        )}
      </nav>
      <SignIn
        sigInSidebar={sigInSidebar}
        setSignInSidebar={setSignInSidebar}
        setUser={setUser}
      />
      {/* <div className="close_cart" onClick={()=>}>2</div> */}
      <div className="food_item_and_price_list">
        {cartData && cartData.length > 0 ? (
          cartData.map((cartItem) => {
            return (
              <div className="sidebar_div" key={cartItem.id}>
                <div className="img_and_name">
                  <img src={cartItem.image} alt="" />
                  <p>{cartItem.name}</p>
                </div>
                <div className="quantity">
                  <button
                    className="minus"
                    onClick={() => {
                      updateCartQuantity(cartItem, -1);
                      // handleqty(cartItem);
                    }}
                  >
                    -
                  </button>
                  <p>{cartItem.qty}</p>
                  <button
                    className="plus"
                    onClick={() => updateCartQuantity(cartItem, +1)}
                  >
                    +
                  </button>
                </div>
                <div className="total_price_">
                  <p>
                    ₹<span>{cartItem.totalPrice}</span>
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No items here</p>
        )}
      </div>
      <div className="billing">
        <div className="tax_and_delivery">
          <h4>Bill Details</h4>
          <div className="bill_details">
            <div style={{ fontWeight: "600" }}>
              <p>Item Total</p>
              <span>₹{allPrice ? allPrice : 0}</span>
            </div>
            <div>
              <p>Deliver Fee</p>
              <span>₹{cartData && cartData.length > 0 ? "40.00" : "0"}</span>
            </div>
            <div>
              <p>GST</p>
              <span>₹{allPrice ? (allPrice * 5) / 100 : 0}</span>
            </div>
            <div>
              <p>Platform Fee</p>
              <span>₹{cartData && cartData.length > 0 ? "6.00" : "0"}</span>
            </div>
          </div>
        </div>
        <hr />
      </div>
      <div className="sub_total">
        <div className="total_price_and_btn">
          <button onClick={hanldeBuyItemButton}>Buy now</button>
          <p>
            Total ₹<span>{Alltotal}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
