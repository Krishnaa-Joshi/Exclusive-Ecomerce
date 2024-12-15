// Main Component
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";
import Footer from "@/component/common component/footer/footer";

// Hooks

// SVGs
import OrderSucessfull from "../../assets/Ordered placed/order_sucessful.png";
import { useContext } from "react";
import { Context } from "@/context";
import SummaryProductCard from "@/component/Summery ProductCard/SummeryProducrCard";
import { useNavigate } from "react-router-dom";

function OrderPlaced() {
  const { cartProducts } = useContext(Context);
  const Navigate = useNavigate();

  // Calculate Total Price
  const totalPrice = cartProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  // OrderNo Generator
  const orderNoGenrator = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < 13; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  const orderNo = orderNoGenrator();

  return (
    <>
      <HeroSection />
      <NavBar />

      <div className="bg-[#F5F5F5] m-10 rounded-lg h-[140vh]">
        {/* Order SuccessFul Message */}
        <div className="flex flex-col items-center h-[65vh]">
          <img src={OrderSucessfull} alt="" className="w-24 mt-24" />
          <p className="text-5xl font-semibold my-5 ">
            Thank You For Ordering!
          </p>
          <p className="text-xl text-[#999999] my-1">
            An email confirmation has been Send to you
          </p>

          <p className="text-xl text-[#999999] ">{`Your Order No is ${orderNo}`}</p>

          {/* Order More Button */}
          <button className="bg-[#DB4444] p-3 rounded-sm w-40 text-white mt-8" onClick={()=>Navigate("/")}>
            Order More
          </button>
        </div>

        {/* Order Summery */}
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="bg-white w-2/5 rounded-lg">
            <p className="text-4xl font-medium px-5 p-4 ">Order Summery</p>
            <div
              className={`flex flex-col items-center p-2 overflow-y-auto ${
                cartProducts.length > 2 ? "max-h-[275px]" : ""
              }`}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {cartProducts.map((product) => (
                <SummaryProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="flex justify-between mx-7 my-4 font-medium ">
              <p className="ml-4 text-lg">Total: </p>
              <p>{`$${totalPrice.toFixed(2)}`}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default OrderPlaced;
