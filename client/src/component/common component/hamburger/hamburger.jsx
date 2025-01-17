// Hooks
import { useContext } from "react";
import { Context } from "@/context";
import { useNavigate } from "react-router-dom";

// props
import PropTypes from "prop-types";

// SVGs
import wishlist from "../../../assets/Hamburger assests/wishlist.svg";
import back from "../../../assets/Hamburger assests/back.svg";
import cart from "../../../assets/wishlist assets/cart.svg";
import account from "../../../assets/Navbar assets/Account.svg";
import home from "../../../assets/Hamburger assests/home.svg";
import contact from "../../../assets/Hamburger assests/contact.svg";
import signUp from "../../../assets/Hamburger assests/signup.svg";
import logout from "../../../assets/Navbar assets/logout.svg";
import about from "../../../assets/Hamburger assests/About.svg";
import order from "../../../assets/Hamburger assests/order.svg";

function HamburgerButton({ handleLogOut }) {
  const { isAuth, sethamburger, setSection } = useContext(Context);
  const navigate = useNavigate();
  const handleClick = (path) => {
    navigate(`/${path}`);
    sethamburger(false);
  };

  return (
    <div className="absolute left-0 bg-[#18191A] min-h-screen max-h-auto w-52 z-40 top-0 sm:w-60 sm:top-9">
      <button
        className="m-3"
        onClick={() => {
          sethamburger(false);
        }}
      >
        <img src={back} alt="back" className="w-7" />
      </button>

      <div className="flex flex-col justify-center py-5">
        {/* Home */}
        <div
          className="inline-flex items-center text-white cursor-pointer py-1 pl-3 rounded-md"
          onClick={() => {
            handleClick("");
          }}
        >
          <img src={home} alt="Home Icon" className="mr-3" />
          <p className="font-medium p-2 w-full sm:text-lg">Home</p>
        </div>
        {/* Contact */}
        <div
          className="inline-flex items-center text-white cursor-pointer py-1 pl-3 rounded-md"
          onClick={() => {
            handleClick("contact");
          }}
        >
          <img src={contact} alt="Contact Icon" className="mr-3" />
          <p className="font-medium p-2 w-full sm:text-lg">Contact</p>
        </div>
        {/* About */}
        <div
          className="inline-flex items-center text-white cursor-pointer py-1 pl-3 rounded-md"
          onClick={() => {
            handleClick("about");
          }}
        >
          <img src={about} alt="About Icon" className="mr-3" />
          <p className="font-medium p-2 w-full sm:text-lg">About</p>
        </div>
        {/* Wishlist */}
        <div
          className="inline-flex items-center text-white cursor-pointer py-1 pl-3 rounded-md"
          onClick={() => {
            handleClick("wishlist");
          }}
        >
          <img src={wishlist} alt="Wishlist Icon" className="mr-3" />
          <p className="font-medium p-2 w-full sm:text-lg">Wishlist</p>
        </div>
        {/* Cart */}
        <div
          className="inline-flex items-center text-white cursor-pointer py-1 pl-3 rounded-md"
          onClick={() => {
            handleClick("cart");
          }}
        >
          <img src={cart} alt="Cart Icon" className="mr-3" />
          <p className="font-medium p-2 w-full sm:text-lg">Cart</p>
        </div>
        {/* Account */}
        <div
          className="inline-flex items-center text-white cursor-pointer py-1 pl-3 rounded-md"
          onClick={() => {
            handleClick("account");
          }}
        >
          <img src={account} alt="Account Icon" className="mr-3" />
          <p className="font-medium p-2 w-full sm:text-lg">Account</p>
        </div>
        {/* My Order */}
        <div
          className="inline-flex items-center text-white cursor-pointer py-1 pl-3 rounded-md"
          onClick={() => {
            setSection("order");
            handleClick("account");
          }}
        >
          <img src={order} alt="Account Icon" className="mr-3" />
          <p className="font-medium p-2 w-full sm:text-lg">My Order</p>
        </div>
        {/* Signup and Login */}
        {isAuth ? (
          <div
            className="inline-flex items-center text-white cursor-pointer py-1 pl-3 rounded-md"
            onClick={() => {
              handleLogOut();
            }}
          >
            <img src={logout} alt="Logout Icon" className="mr-3" />
            <p className="font-medium p-2 w-full sm:text-lg">Log Out</p>
          </div>
        ) : (
          <div
            className="inline-flex items-center text-white cursor-pointer py-1 pl-3 rounded-md"
            onClick={() => {
              handleClick("signUp");
            }}
          >
            <img src={signUp} alt="Sign Up Icon" className="mr-3" />
            <p className="font-medium p-2 w-full sm:text-lg">Sign Up</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default HamburgerButton;

HamburgerButton.propTypes = {
  handleLogOut: PropTypes.func,
};
