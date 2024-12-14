// Hooks
import { Context } from "@/context";
import { useState, useEffect, useContext} from "react";
import { useLocation, useNavigate } from "react-router-dom";

// SVGs
import logout from "../../../assets/Navbar assets/logout.svg";
import cart from "../../../assets/Navbar assets/cart.svg";
import searchIcon from "../../../assets/Navbar assets/search.svg";
import blackAccount from "../../../assets/Navbar assets/Account-black.svg";
import Account from "../../../assets/Navbar assets/Account.svg";
import AccountSelected from "../../../assets/Navbar assets/clickAccount.svg";
import order from "../../../assets/Navbar assets/myOrder.svg";
import wishlist from "../../../assets/Navbar assets/wishlist.svg";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentPage, setCurrentPage, setIsLogin, setSection, isAuth, setCategoryProducts, search, setSearch } =
    useContext(Context);
  const [dropDown, setDropDown] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (search.trim() === "") {
      setError("Please enter a search term");
      setCategoryProducts([]);
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    setError(""); // Clear any previous error message
    try {

      const response = await fetch(
        `https://dummyjson.com/products/search?q=${search}`
      );
      const data = await response.json();
      setCategoryProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Something went wrong. Please try again later.");
    }

    navigate("/category")
  };

  useEffect(() => {
    const currentPath = location.pathname.slice(1);
    setCurrentPage(currentPath || "");
  }, [location, setCurrentPage]);

  const handleClick = (page, section = "") => {
    if (page === "signUp") {
      setIsLogin(false);
    }
    setSection(section);
    setCurrentPage(page);
    navigate(`/${page}`);
  };

  const handleDropDown = () => {
    setDropDown((prev) => !prev); // Toggle dropdown state
  };

  return (
    <div className="flex justify-between items-center h-20 border-b-[1px] border-b-[#D9DbE9]">
      <div className="flex w-2/3">
        {/* logo */}
        <div className="w-2/5 flex justify-center">
          <h3 className="font-bold text-2xl">Exclusive</h3>
        </div>

        {/* Pages */}
        <ul className="flex font-medium w-[51%] justify-center text-md">
          <li
            onClick={() => handleClick("")}
            className={`mx-7 my-2 cursor-pointer ${
              currentPage === "" ? "border-b-2 border-b-[#888888]" : ""
            }`}
          >
            Home
          </li>
          <li
            onClick={() => handleClick("contact")}
            className={`mx-7 my-2 cursor-pointer ${
              currentPage === "contact" ? "border-b-2 border-b-[#888888]" : ""
            }`}
          >
            Contact
          </li>
          <li
            onClick={() => handleClick("about")}
            className={`mx-7 my-2 cursor-pointer ${
              currentPage === "about" ? "border-b-2 border-b-[#888888]" : ""
            }`}
          >
            About
          </li>
          {!isAuth ? (
            <li
              onClick={() => handleClick("signUp")}
              className={`mx-7 my-2 cursor-pointer ${
                currentPage === "signUp" ? "border-b-2 border-b-[#888888]" : ""
              }`}
            >
              Sign Up
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>

      <div className="flex w-1/3">
        {/* search bar */}
        <div className={`flex w-1/2 bg-[#EFF0F6] p-3 rounded-lg`}>
          <input
            type="text"
            placeholder={error ? error : `What are you looking for?`}
            className="w-11/12 bg-[#EFF0F6] focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <img
            src={searchIcon}
            alt="search"
            className="cursor-pointer"
            onClick={handleSearch}
          />
        </div>
        {/* wishList */}
        <img
          src={wishlist}
          alt="wishlist"
          onClick={() => handleClick("wishlist", "wishList")}
          className="ml-4 mr-2 cursor-pointer"
        />
        {/* cart */}
        <img
          src={cart}
          alt="cart"
          onClick={() => handleClick("cart")}
          className="mx-2 cursor-pointer"
        />
        {/* Account */}
        {isAuth && (
          <img
            src={dropDown ? AccountSelected : blackAccount}
            alt="account"
            onClick={handleDropDown}
            className={`cursor-pointer mx-2 ${dropDown ? "w-[7%]" : "w-[5%]"}`}
          />
        )}
      </div>

      {/* Dropdown of Account */}
      {dropDown && (
        <div className="absolute top-[111px] right-32 w-[16%] h-[22%] rounded-lg backdrop-blur-md bg-[#99959A] shadow-lg">
          <ul>
            <li
              className="flex m-5 cursor-pointer"
              onClick={() => handleClick("account", "profile")}
            >
              <img src={Account} alt="Account" />
              <p className="mx-4 text-white">Manage My Account</p>
            </li>
            <li
              className="flex m-5 cursor-pointer"
              onClick={() => handleClick("account", "order")}
            >
              <img src={order} alt="Order" />
              <p className="mx-4 text-white">My Order</p>
            </li>
            <li
              className="flex m-5"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/signUp");
              }}
            >
              <img src={logout} alt="Logout" />
              <p className="mx-4 text-white cursor-pointer">Logout</p>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default NavBar;