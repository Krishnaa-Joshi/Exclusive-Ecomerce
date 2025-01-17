// Hooks
import { Context } from "@/context";
import { useState, useEffect, useContext } from "react";
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
import Hamburger from "../../../assets/Navbar assets/menu.svg";

// Component
import HamburgerButton from "../hamburger/hamburger";

function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    currentPage,
    setCurrentPage,
    setIsLogin,
    setSection,
    isAuth,
    handleSearch,
    setSearch,
    hamburger,
    sethamburger,
  } = useContext(Context);
  const [dropDown, setDropDown] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  // Search button
  const handleSeachButton = () => {
    setSearch(searchVal);
    handleSearch();
  };

  // handle page location
  useEffect(() => {
    const currentPath = location.pathname.slice(1);
    setCurrentPage(currentPath || "");
  }, [location, setCurrentPage]);

  // page switch
  const handleClick = (page, section = "") => {
    if (page === "signUp") {
      setIsLogin(false);
    }
    setSection(section);
    setCurrentPage(page);
    navigate(`/${page}`);
  };

  // handle Logout
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/signUp");
  };

  // Close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (dropDown) {
        setDropDown(false); // Close the dropdown when the user scrolls
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dropDown]);

  return (
    <div className="flex justify-between items-center h-[54px] sm:h-[60px] border-b-[1px] border-b-[#D9DbE9] md:h-[65px] lg:h-[67px] xl:h-[70px]">
      <div className="flex justify-evenly w-24 sm:w-32 md:w-[65vw] md:justify-center lg:w-2/3">
        {/* Hamburger */}
        {hamburger ? (
          <div className="md:hidden">
            <HamburgerButton handleLogOut={handleLogOut} />
          </div>
        ) : (
          <button
            className="w-[20px] mt-1 cursor-pointer sm:w-[22px] md:hidden"
            onClick={() => sethamburger(true)}
          >
            <img src={Hamburger} alt="hamburger" />
          </button>
        )}
        <div className="flex items-center justify-between w-2/5 md:w-[12vw] md:justify-end  ">
          {/* logo */}
          <h3
            className="font-bold text-lg cursor-pointer sm:text-xl lg:text-2xl"
            onClick={() => navigate("/")}
          >
            Exclusive
          </h3>
        </div>

        {/* Pages */}
        <ul className="hidden items-center md:text-md md:flex md:font-medium md:w-[40vw] md:justify-end lg:justify-center lg:w-[45vw]">
          {/* Home */}
          <li
            onClick={() => handleClick("")}
            className={`md:text-base md:mx-3 md:cursor-pointer lg:mx-7 lg:my-2 ${
              currentPage === "" ? "md:border-b-2 md:border-b-[#888888]" : ""
            }`}
          >
            Home
          </li>
          {/* Contact */}
          <li
            onClick={() => handleClick("contact")}
            className={`md:text-base md:mx-3 md:cursor-pointer lg:mx-7 lg:my-2 ${
              currentPage === "contact"
                ? "md:border-b-2 md:border-b-[#888888]"
                : ""
            }`}
          >
            Contact
          </li>
          {/* About */}
          <li
            onClick={() => handleClick("about")}
            className={`md:text-base md:mx-3 md:cursor-pointer lg:mx-7 lg:my-2 ${
              currentPage === "about"
                ? "md:border-b-2 md:border-b-[#888888]"
                : ""
            }`}
          >
            About
          </li>
          {/* signup */}
          {!isAuth ? (
            <li
              onClick={() => handleClick("signUp")}
              className={`md:text-base md:mx-3 md:cursor-pointer lg:mx-7 lg:my-2 ${
                currentPage === "signUp"
                  ? "md:border-b-2 md:border-b-[#888888]"
                  : ""
              }`}
            >
              Sign Up
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>

      <div className="flex sm:w-[40vw] sm:justify-end md:justify-center md:items-center md:w-[50vw] lg:w-1/3">
        {/* search bar */}
        <div className="flex bg-[#EFF0F6] p-2.5 mr-2 rounded-sm sm:mr-5 sm:w-[28vw] sm:p-2 md:w-[24vw] md:mr-0 md:p-2.5 md:rounded-lg lg:p-3 lg:w-[21vw] xl:w-1/2">
          <input
            type="text"
            placeholder="What are you looking for?"
            className="text-xs bg-[#EFF0F6] focus:outline-none sm:w-11/12 md:w-11/12 lg:text-sm"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <img
            src={searchIcon}
            alt="search"
            className="w-[18px] cursor-pointer md:w-[22px] lg:w-auto "
            onClick={handleSeachButton}
          />
        </div>

        {/* wishList */}
        <img
          src={wishlist}
          alt="wishlist"
          onClick={() => handleClick("wishlist", "wishList")}
          className="hidden md:block md:ml-2 md:mr-1 md:cursor-pointer lg:ml-4 lg:mr-2"
        />

        {/* cart */}
        <img
          src={cart}
          alt="cart"
          onClick={() => handleClick("cart")}
          className="hidden md:block md:cursor-pointer md:mx-1 lg:mx-2"
        />

        {/* Account */}
        {isAuth && (
          <div className="hidden group md:relative md:inline-block">
            <button className="flex items-center">
              <img
                src={blackAccount}
                alt="account"
                className="cursor-pointer group-hover:hidden md:w-6 md:mx-1 lg:mx-2 lg:w-[26px] xl:w-7"
              />
              <img
                src={AccountSelected}
                alt="selected account"
                className="cursor-pointer mx-2 hidden group-hover:block w-7"
              />
            </button>

            {/* Hoverable Dropdown */}
            <div className="absolute right-2 rounded-lg backdrop-blur-md bg-[#99959A] shadow-lg z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 invisible group-hover:visible md:w-[204px] lg:w-[240px] lg:h-[135px] xl:w-64 xl:h-36">
              <div>
                <div
                  className="flex cursor-pointer text-sm md:m-4 xl:m-5 lg:text-base"
                  onClick={() => handleClick("account", "profile")}
                >
                  <img src={Account} alt="Account" />
                  <p className="md:mx-2 lg:mx-4 text-white">
                    Manage My Account
                  </p>
                </div>
                <div
                  className="flex cursor-pointer text-sm md:m-4 xl:m-5 lg:text-base"
                  onClick={() => handleClick("account", "order")}
                >
                  <img src={order} alt="Order" />
                  <p className="text-white md:mx-2 lg:mx-4">My Order</p>
                </div>
                <div
                  className="flex cursor-pointer text-sm md:m-4 lg:text-base xl:m-5"
                  onClick={() => handleLogOut()}
                >
                  <img src={logout} alt="Logout" />
                  <p className="text-white md:mx-2 lg:mx-4">Logout</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
