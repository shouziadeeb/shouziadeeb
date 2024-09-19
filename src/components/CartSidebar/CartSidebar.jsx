import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoLogInOutline } from "react-icons/io5";
import { FiUserPlus, FiUser } from "react-icons/fi";
import { useUser } from "../../hooks/useUser";
import { SignIn } from "../SignIn/SignIn";
import "./cartSidebar.css";
import { handleQuantity } from "../../store/redux";
import { useNavigate } from "react-router-dom";

const CartSidebar = ({ showCart, cart, setCart, setshowAddress }) => {
  const [allPrice, setAllPrice] = useState(0);
  const { user, setUser, logout } = useUser();
  const [sigInSidebar, setSignInSidebar] = useState(false);

  const cartData = useSelector((state) => state.cartList);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const updateCartQuantity = (item, number) => {
    dispatch(handleQuantity({ item, number }));
  };

  useEffect(() => {
    const total = cartData.reduce(
      (acc, curValue) => acc + Number(curValue.totalPrice),
      0
    );
    setAllPrice(total);
  }, [cartData]);

  const hanldeBuyItemButton = () => {
    if (user && cartData.length > 0) {
      navigate("/address");
    } else {
      if (cartData.length < 1) alert("Please add item in cart");
      else {
        alert("sign in fisrt");
      }
    }
  };
  const handleEmailSidebar = () => {
    setSignInSidebar(true);
  };
  console.log(cartData);
  return (
    <div className="cart_sidebar" style={{ width: showCart ? "40%" : "0" }}>
      <nav>
        {user ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <p style={{ fontSize: "2vw", cursor: "pointer" }} onClick={logout}>
              <IoLogInOutline />
            </p>
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
                <div>
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
      <div className="sub_total">
        <div className="total_price_and_btn">
          <button onClick={hanldeBuyItemButton}>Buy now</button>
          <p>
            Total ₹<span>{allPrice}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;
