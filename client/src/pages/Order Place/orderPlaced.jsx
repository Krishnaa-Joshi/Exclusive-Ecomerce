// Main Component
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";
import Footer from "@/component/common component/footer/footer";

// Hooks
import { useContext } from "react";
import { Context } from "@/context";
import { useNavigate } from "react-router-dom";

// SVGs
import OrderSucessfull from "../../assets/Ordered placed/order_sucessful.png";
import SummaryProductCard from "@/component/Summery ProductCard/SummeryProducrCard";
import Button from "@/component/Button/Button";

function OrderPlaced() {
  const { orderNoGenrator, totalPrice, orderedDetails } = useContext(Context);

  const navigate = useNavigate();

  // orderNo 
  const orderNo = orderNoGenrator();
  
  // Products
  const Products = orderedDetails[orderedDetails.length - 1]?.products;
  
  // Total Price
  const total = totalPrice(Products);
  
  // order More
  const handleOrderMore = ()=>{
    navigate("/");
  }

  return (
    <>
      <HeroSection />
      <NavBar />

      <div className="bg-[#F5F5F5] rounded-lg h-[140vh] m-5 sm:m-10 md:h-[150vh]">
        {/* Order SuccessFul Message */}
        <div className="flex flex-col items-center h-[60vh] sm:h-[65vh]">
          <img src={OrderSucessfull} alt="" className="w-16 mt-16 sm:w-24 sm:mt-24" />
          <p className="text-xl font-semibold my-5  sm:text-3xl md:text-5xl">
            Thank You For Ordering!
          </p>
          <p className="text-[#999999] text-lg text-center sm:my-1 sm:text-start sm:text-xl">
            An email confirmation has been Send to you
          </p>
          <p className="text-[#999999] text-lg text-center sm:text-start sm:text-xl">{`Your Order No is #${orderNo}`}</p>

          {/* Order More Button */}
          <Button padding="p-3" width="w-40" rounded="rounded-sm" handleFunc={handleOrderMore} title="Order More" otherStyle="mt-6 sm:mt-8"/>
        </div>

        {/* Order Summery */}
        <div className="flex flex-col items-center justify-center sm:mt-10 md:mt-20">
          <div className="bg-white rounded-lg w-[80vw] md:w-[60vw] lg:w-[50vw] xl:w-2/5">
            <p className="font-medium text-2xl px-5 my-2.5  sm:text-4xl">Order Summery</p>
            <div
              className={`flex flex-col items-center overflow-y-auto p-1 sm:p-2 ${
                Products.length > 2 ? "max-h-[275px]" : ""
              }`}
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {Products.map((product) => (
                <SummaryProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="flex justify-between mx-7 my-4 font-medium ">
              <p className="ml-3 text-lg">Total: </p>
              <p className="mr-4">{`$${total.toFixed(2)}`}</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default OrderPlaced;
