// Hooks
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "@/context";

// SVGs and IMGs
import AppStore from "../../../assets/Footer assets/appStore.svg";
import PlayStore from "../../../assets/Footer assets/playStore.svg";
import Send from "../../../assets/Footer assets/send.svg";
import Twitter from "../../../assets/Footer assets/X.svg";
import QRCode from "../../../assets/Footer assets/QRcode.png";
import Instagram from "../../../assets/Footer assets/instagram.svg";
import Facebook from "../../../assets/Footer assets/facebook.svg";
import Linkedin from "../../../assets/Footer assets/linkedin.svg";
import NewsLetter from "../../../assets/Footer assets/newsletter.svg";

function Footer() {
  const navigate = useNavigate();
  const { isAuth } = useContext(Context);

  return (
    <>
      <div className="bg-black text-white lg:h-80 lg:flex lg:justify-evenly lg:items-center lg:w-full">
        {/* Basic Info */}
        <div className="flex flex-col items-center justify-center p-5 sm:p-10 sm:flex-row sm:justify-between md:justify-around lg:flex-row lg:justify-center lg:p-0 lg:h-[166px]">
          <div className="hidden sm:block sm:w-[10vw] lg:hidden">
            <div className="flex w-[15vw]">
              <img src={NewsLetter} alt="" className="w-[12vw]" />
              <img src={NewsLetter} alt="" className="w-[12vw] ml-[-7vw]" />
              <img src={NewsLetter} alt="" className="w-[12vw] ml-[-7vw]" />
            </div>
          </div>
          <div className="flex flex-col items-center sm:block">
            <h2 className="hidden sm:font-bold sm:text-xl sm:mb-4 lg:block">
              Exclusive
            </h2>
            <h2 className="text-3xl font-bold mb-2 text-center md:text-start lg:font-semibold lg:text-base">
              Subscribe to Newsletter
            </h2>
            <p className="text-lg mb-3 lg:text-base">
              Get 10% off your first order
            </p>
            <div className="flex justify-between outline outline-white rounded-sm px-2 py-3 w-[60vw] sm:w-[40vw] sm:p-2 sm:outline-2 md:w-[30vw] lg:w-[86%]">
              <input
                className="bg-transparent w-[47vw] focus:outline-none sm:w-[84%]"
                type="text"
                placeholder="Enter your email"
              />
              <img src={Send} alt="send" className="" />
            </div>
          </div>
        </div>

        <div className="flex justify-around px-1 py-3 sm:px-1.5 sm:py-5 lg:mb-0 lg:py-0 lg:px-0 lg:w-[50vw] xl:py-3">
          {/* contact details */}
          <div className="">
            <h2 className="font-bold text-xl mb-2 sm:font-bold sm:text-xl sm:mb-4">
              Address
            </h2>
            <p className="mb-3">
              Icfai University, jaipur
              <br />
              Rajasthan, India.
            </p>
            <h1 className="font-medium mb-1">Email</h1>
            <p className="mb-3">exclusive@gmail.com</p>
            <h1 className="font-medium mb-1">Phone No.</h1>
            <p className="mb-3">+91 9824654323</p>
          </div>

          {/* Different Pages Link */}
          <div className="hidden sm:block xl:h-[178px] ">
            <h2 className="hidden sm:font-bold sm:text-xl sm:mb-4 sm:block">
              Account
            </h2>
            <h2 className="font-bold text-3xl mb-2 sm:hidden">Navigate</h2>
            <p
              className="mb-1 text-lg cursor-pointer sm:mb-2"
              onClick={() => navigate("/account")}
            >
              My Account
            </p>
            <p
              className={`mb-1 text-lg cursor-pointer sm:mb-2 ${
                isAuth ? "hidden" : ""
              }`}
              onClick={() => navigate("/signUp")}
            >
              Login / Register
            </p>
            <p
              className="mb-1 text-lg cursor-pointer sm:mb-2"
              onClick={() => navigate("/cart")}
            >
              Cart
            </p>
            <p
              className="mb-1 text-lg cursor-pointer sm:mb-2"
              onClick={() => navigate("/wishlist")}
            >
              Wishlist
            </p>
            <p
              className="mb-1 text-lg cursor-pointer sm:mb-2"
              onClick={() => navigate("/")}
            >
              Shop
            </p>
          </div>

          {/* Quick Links */}
          <div className="">
            <h2 className="font-bold text-xl sm:text-xl mb-4 ">Quick Links</h2>
            <p className="mb-1 cursor-pointer sm:mb-2">Privacy Policy</p>
            <p className="mb-1 cursor-pointer sm:mb-2">Terms of Use</p>
            <p
              className="mb-1 cursor-pointer sm:mb-2"
              onClick={() => navigate("/FAQs")}
            >
              FAQ
            </p>
            <p
              className="mb-1 cursor-pointer sm:mb-2"
              onClick={() => navigate("/contact")}
            >
              Contact
            </p>
          </div>
        </div>

        {/* Mobile App */}
        <div className="flex flex-col items-center justify-center sm:py-10 md:py-5 lg:py-0">
          <h2 className="font-bold text-3xl mb-2 sm:mb-4 lg:text-xl">
            Download App
          </h2>
          <p className="mb-1 text-[#A9A9A9] sm:mb-2">
            Save ₹250 with App New User only
          </p>
          <div className="flex mb-4 cursor-pointer">
            {/* QR Code */}
            <img className="h-[11vh]" src={QRCode} alt="QR Code" />
            {/* paly store and app Store Link */}
            <div className="flex flex-col">
              <img
                className="h-[5vh] mb-1.5 cursor-pointer md:mb-2.5"
                src={PlayStore}
                alt="Play Store"
              />
              <img
                className="h-[5vh] cursor-pointer"
                src={AppStore}
                alt="App Store"
              />
            </div>
          </div>

          {/* Social Media Links */}
          <h1 className="text-2xl font-semibold mb-2 mt-1.5 lg:text-xl lg:mt-0 xl:mt-0 xl:hidden">
            Follow Us
          </h1>
          <div className="flex w-[50vw] justify-between mb-5 sm:mb-0 sm:w-40 lg:w-[12vw]">
            <img src={Facebook} alt="Facebook" className="cursor-pointer" />
            <img src={Twitter} alt="X" className="cursor-pointer" />
            <img src={Instagram} alt="Instagram" className="cursor-pointer" />
            <img src={Linkedin} alt="LinkedIn" className="cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Copyrights */}
      <div className="bg-black w-full border-t-[#141414] border-t-2 flex justify-center items-center h-[6vh] lg:h-14">
        <p className="text-[#3D3D3D] text-sm sm:text-base">
          &copy; Copyright Rimel 2022. All right reserved
        </p>
      </div>
    </>
  );
}

export default Footer;
