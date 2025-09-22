/* eslint-disable react/no-unescaped-entities */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import Header from "../Header/Header";
import Suggest from "../FirstSuggestionSection/Suggest";
// import foods from "../../data.json";
import { Footer } from "../Footer/Footer";
import { useSelector } from "react-redux";
import Carousel from "../Carousel/Carousel";
import FoodList from "../FoodList/FoodList";
import HeaderMobile from "../HeaderForMobile/HeaderMobile";
import CarouselSecond from "../Carousel/CarouselSecond";
import { useNavigate } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

const HomePage = () => {
  const API_URL = "https://fooddelivery-lzym.onrender.com";
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    offer: "",
    price: [],
  });
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [showOnScroll, setShowOnScroll] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const handleSearch = (value) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };
  const cartData = useSelector((state) => state.cartList.items);
  const orderedData = useSelector((state) => state.cartList.myOrders);
  const handleFilterCatoegory = (value) => {
    setFilters((prev) => ({
      ...prev,
      category: value,
      offer: value,
      price: [],
    }));
  };
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // If the user is scrolling down, hide the div
      if (currentScrollY > lastScrollY) {
        setShowOnScroll(false);
      } else {
        // If the user is scrolling up, show the div
        setShowOnScroll(true);
      }

      // Update the last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const [foods, setFoods] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchData = useCallback(
    async (reset = false) => {
      try {
        const res = await fetch(
<<<<<<< HEAD
          `${API_URL}/api/food?skip=${reset ? 0 : skip}&limit=${limit}&search=${
            filters.search
          }&category=${filters.category}&minPrice=${
            filters.price[0]
          }&maxPrice=${filters.price[1]}`
=======
          `https://fooddelivery-lzym.onrender.com//api/food?skip=${
            reset ? 0 : skip
          }&limit=${limit}&search=${filters.search}&category=${
            filters.category
          }&minPrice=${filters.price[0]}&maxPrice=${filters.price[1]}`
>>>>>>> 37b4df04273d344c3f2e1a8ea8c3190568f8313c
        );
        const data = await res.json();

        if (reset) {
          setFoods(data.data);
          setSkip(limit);
        } else {
          setFoods((prev) => [...prev, ...data.data]);
          setSkip((prev) => prev + limit);
        }

        setTotal(data.total);

        // Update hasMore properly
        const newCount = reset
          ? data.data.length
          : foods.length + data.data.length;

        setHasMore(newCount < data.total);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    },
    [skip, filters] // ⚡ include skip + filters in dependencies
  );

  // Reset + fetch when filters change
  useEffect(() => {
    fetchData(true);
  }, [filters]);

  const handleCategory = (value) => {
    setFilters((prev) => ({ ...prev, category: value }));
  };
  const handleOffer = (value) => {
    setFilters((prev) => ({ ...prev, offer: value }));
  };

  const handlePrice = (a, b) => {
    setFilters((prev) => ({ ...prev, price: [a, b] }));
  };
  const handleCartItemClick = (value) => {
    setCart((prev) => [...prev, value]);
  };
  // const filterFoodData = useMemo(() => {
  //   return foods?.filter?.((food) => {
  //     let isCategoryPresent = true;
  //     let isNamePresent = true;
  //     let isOfferPresent = true;
  //     let isPricePresent = true;

  //     if (filters.category) {
  //       isCategoryPresent = food.category
  //         ?.toLowerCase()
  //         .includes(filters.category.toLowerCase());
  //     }
  //     if (filters.offer) {
  //       isOfferPresent = food.category
  //         ?.toLowerCase()
  //         .includes(filters.offer.toLowerCase());
  //     }
  //     if (filters.price.length > 0) {
  //       // isPricePresent = food.price < 100;
  //       isPricePresent =
  //         filters.price[0] <= food.price && food.price < filters.price[1];
  //       // console.log("price", filters.price);
  //     }

  //     if (filters.search) {
  //       isNamePresent = food?.name
  //         ?.toLowerCase()
  //         .includes?.(filters.search.toLowerCase());
  //     }
  //     return (
  //       isCategoryPresent && isNamePresent && isOfferPresent && isPricePresent
  //     );
  //   });
  // }, [filters, foods]);

  return (
    <>
      <HeaderMobile handleSearch={handleSearch} searchValue={filters.search} />

      <Header
        badgeCounter={cartData && cartData.length}
        setSidebar={setShowCart}
        searchValue={filters.search}
        handleSearch={handleSearch}
        handleOffer={handleOffer}
      />
      <CarouselSecond />
      <Suggest
        foodList={foods}
        handleFilterCatoegory={handleFilterCatoegory}
        handleCategory={handleCategory}
        isFilterAdded={
          filters.category ||
          filters.search ||
          filters.price.length > 0 ||
          filters.offer
        }
        handlePrice={handlePrice}
      />
      <div className="hr_tag">
        <p>WHAT'S ON YOUR MIND</p>
        <hr />
      </div>
      <div className="foodList_container">
        <FoodList
          showCart={showCart}
          setShowCart={setShowCart}
          setCart={setCart}
          hasMore={hasMore}
          fetchMore={fetchData}
          foodList={foods}
          handleCartItemClick={handleCartItemClick}
          cart={cart}
        ></FoodList>
        <div className="hr_tag">
          <p>DID YOU ENJOY..?</p>
          <hr />
        </div>
      </div>
      <Carousel />
      <Footer />
      <div
        className="cart_mobile"
        style={{
          display:
            cartData && cartData.length > 0 && window.innerWidth < 600
              ? "block"
              : "none",
        }}
      >
        <div className="for_mobileCart">
          <p>
            <span>{cartData && cartData.length}</span>
            {cartData && cartData.length > 1 ? " Items" : " Item"} Added
          </p>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              gap: ".5vw",
              cursor: "pointer",
            }}
            onClick={() => setShowCart(true)}
          >
            View Cart <FaAngleRight />
          </p>
        </div>
      </div>
      <div
        className="myOrder_for_mobile"
        style={{
          height: showOnScroll && window.innerWidth < 600 ? "18vw" : "0",
        }}
      >
        <div className="for_mobile_order">
          <span>
            <FaShoppingBag />
          </span>{" "}
          Cart
        </div>
        <hr />
        <div className="for_mobile_order" onClick={() => navigate("/orders")}>
          <span>
            <FaShoppingBag />
          </span>{" "}
          Order
          <span style={{ color: "black", fontWeight: "bolder" }}>
            {orderedData.length}
          </span>
        </div>
      </div>
    </>
  );
};

export default HomePage;
