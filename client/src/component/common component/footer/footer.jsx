// SVGs and IMGs
import AppStore from "../../../assets/Footer assets/appStore.svg"
import PlayStore from "../../../assets/Footer assets/playStore.svg"
import Send from "../../../assets/Footer assets/send.svg"
import Twitter from "../../../assets/Footer assets/X.svg"
import QRCode from "../../../assets/Footer assets/QRcode.png"
import Instagram from "../../../assets/Footer assets/instagram.svg"
import Facebook from "../../../assets/Footer assets/facebook.svg"
import Linkedin from "../../../assets/Footer assets/linkedin.svg"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { Context } from "@/context"


function Footer() {

  const navigate = useNavigate();
  const {isAuth} = useContext(Context);

  return (
    <>
      <div className="h-80 bg-black text-white flex justify-evenly items-center w-full">

        {/* Basic Info */}
        <div className="h-[166px]">
          <h2 className="font-bold text-xl mb-4">Exclusive</h2>
          <h5 className="font-semibold mb-4 cursor-pointer">Subscribe</h5>
          <p className="mb-3">Get 10% off your first order</p>
          <div className="flex outline outline-white outline-2 rounded-sm p-2 w-[86%]">
            <input
              className="bg-transparent w-[84%] focus:outline-none"
              type="text"
              placeholder="Enter your email"
            />
            <img src={Send} alt="send" />
          </div>
        </div>

        {/* contact details */}
        <div>
          <h2 className="font-bold text-xl mb-4">Section</h2>
          <p className="mb-3">
            Icfai University, jaipur,
            <br />
            Rajasthan, India.
          </p>
          <p className="mb-3">exclusive@gmail.com</p>
          <p className="mb-3">+91 9824654323</p>
        </div>

        {/* Different Pages Link */}
        <div className="h-[178px]">
          <h2 className="font-bold text-xl mb-4">Account</h2>
          <p className="mb-2 cursor-pointer" onClick={()=>navigate("/account")}>My Account</p>
          <p className={`mb-2 cursor-pointer ${isAuth ? "hidden" : ""}`} onClick={()=>navigate("/signUp")}>Login / Register</p>
          <p className="mb-2 cursor-pointer" onClick={()=>navigate("/cart")}>Cart</p>
          <p className="mb-2 cursor-pointer" onClick={()=>navigate("/wishlist")}>Wishlist</p>
          <p className="mb-2 cursor-pointer" onClick={()=>navigate("/")}>Shop</p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="font-bold text-xl mb-4 ">Quick Links</h2>
          <p className="mb-2 cursor-pointer">Privacy Policy</p>
          <p className="mb-2 cursor-pointer">Terms of Use</p>
          <p className="mb-2 cursor-pointer" onClick={()=>navigate("/FAQs")}>FAQ</p>
          <p className="mb-2 cursor-pointer" onClick={()=>navigate("/contact")}>Contact</p>
        </div>

        {/* Mobile App */}
        <div>
          <h2 className="font-bold text-xl mb-4 ">Download App</h2>
          <p className="mb-2 text-[#A9A9A9]">
            Save ₹250 with App New User only
          </p>
          <div className="flex mb-4 cursor-pointer">
            {/* QR Code */}
            <img 
              className="h-16"
              src={QRCode}
              alt="QR Code"
            /> 
            {/* paly store and app Store Link */}
            <div className="flex flex-col"> 
              <img
                className="h-7 mb-1.5 cursor-pointer"
                src={PlayStore}
                alt="Play Store"
              />
              <img
                className="h-7 cursor-pointer"
                src={AppStore}
                alt="App Store"
              />
            </div>
          </div>  

          {/* Social Media Links */}          
          <div className="flex w-40 justify-between"> 
            <img src={Facebook} alt="Facebook" className="cursor-pointer"/>
            <img src={Twitter} alt="X" className="cursor-pointer"/>
            <img src={Instagram} alt="Instagram" className="cursor-pointer"/>
            <img src={Linkedin} alt="LinkedIn" className="cursor-pointer"/>
          </div>
        </div>
      </div>

      {/* Copyrights */}
      <div className="bg-black w-full border-t-[#141414] border-t-2 flex justify-center items-center h-14">
        <p className="text-[#3D3D3D] ">
          &copy; Copyright Rimel 2022. All right reserved
        </p>
      </div>
    </>
  );
}

export default Footer;
