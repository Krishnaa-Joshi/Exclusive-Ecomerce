// Main Component
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";
import Footer from "@/component/common component/footer/footer";

// Hooks
import { useContext } from "react";
import { Context } from "@/context";

// SVGs
import OrderSucessfull from "../../assets/Ordered placed/order_sucessful.png";
import SummaryProductCard from "@/component/Summery ProductCard/SummeryProducrCard";
import Button from "@/component/Button/Button";
import { useNavigate } from "react-router-dom";

function OrderPlaced() {
  const { orderNoGenrator, totalPrice, orderedDetails } = useContext(Context);
  const navigate = useNavigate();

  // orderNo 
  const orderNo = orderNoGenrator();
  
  // Products
  const Products = orderedDetails[orderedDetails.length - 1]?.products;
  console.log(Products);
  
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
          <p className="text-xl text-[#999999] ">{`Your Order No is #${orderNo}`}</p>

          {/* Order More Button */}
          <Button padding="p-3" width="w-40" rounded="rounded-sm" handleFunc={handleOrderMore} title="Order More" otherStyle="mt-8"/>
        </div>

        {/* Order Summery */}
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="bg-white w-2/5 rounded-lg">
            <p className="text-4xl font-medium px-5 my-2.5 ">Order Summery</p>
            <div
              className={`flex flex-col items-center p-2 overflow-y-auto ${
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
