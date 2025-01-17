// Main Component
import Footer from "@/component/common component/footer/footer";
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";
import Path from "@/component/common component/pages path/path";

// Checkout Componet
import BillingDetails from "@/component/Checkout/Billing Detail/billingDetail";
import Checkout from "@/component/Checkout/checkout/checkout";
import BillingProduct from "@/component/Checkout/Billing Product/billingProduct";

// SVGs
import shipping from "../../assets/Checkout assets/shipping.svg";
import selectShipping from "../../assets/Checkout assets/selectShipping.svg";
import payment from "../../assets/Checkout assets/payment.svg";
import selectPayment from "../../assets/Checkout assets/selectPayment.svg";
import review from "../../assets/Checkout assets/review.svg";
import selectReview from "../../assets/Checkout assets/selectReview.svg";
import Line from "../../assets/Checkout assets/line.svg";
import Payment from "@/component/Checkout/Payment/payment";
import SummeryCard from "@/component/Summery Card/summeryCard";
import Button from "@/component/Button/Button";

// Hooks
import { Children, useContext, useState } from "react";
import { Context } from "@/context";

function CheckOutPage() {
  const [section, setSection] = useState("shipping");
  const { cartProducts, handlePlaceOrder } = useContext(Context);

  const title = section === "shipping" || section === "payment" ? "Continue" : "Confirm Order";

  const handleButton = ()=>{
    if(section === "shipping"){
      setSection("payment");
    }
    else if(section === "payment"){
      setSection("review");
    }
    else{
      handlePlaceOrder();
    }
  }

  return (
    <>
      <HeroSection />
      <NavBar />
      <Path />

      <div className="hidden md:block md:mb-20 xl:mb-0 xl:h-[130vh]">
        <h1 className="md:font-semibold md:text-2xl md:ml-10 md:my-5 lg:text-3xl lg:my-10 lg:ml-14 xl:text-4xl xl:my-10 xl:ml-24">
          Billing Details
        </h1>
        <div className="flex justify-between md:w-[96vw] lg:w-[90vw]">
          {/* User Details */}
          <BillingDetails />

          {/* Products Summery */}
          <Checkout />
        </div>
      </div>

      <div className="mb-10 md:hidden">
        <div className="flex items-center justify-evenly h-24 my-4 mx-3">
          <div className="w-10 flex flex-col justify-center items-center">
            <img
              src={section === "shipping" ? selectShipping : shipping}
              alt=""
              className="w-8"
            />
            <p className="font-bold">Shipping</p>
          </div>
          <div className="flex items-start  justify-center h-5 w-[14vw]">
            <img src={Line} alt="" />
          </div>
          <div className="w-10 flex flex-col justify-center items-center">
            <img
              src={section === "payment" ? selectPayment : payment}
              alt=""
              className="w-7 mb-1"
            />
            <p className="font-bold">Payment</p>
          </div>
          <div className="flex items-start justify-center  h-5 w-[14vw]">
            <img src={Line} alt="" />
          </div>
          <div className="w-10 flex flex-col justify-center items-center">
            <img
              src={section === "review" ? selectReview : review}
              alt=""
              className="w-7 mb-1"
            />
            <p className="font-bold">Review</p>
          </div>
        </div>

        <div className="">
          {section === "shipping" ? <BillingDetails /> : null}
          {section === "payment" ? <Payment /> : null}
          {section === "review" ? (
            <div>
              <div
                className="mx-2.5 sm:mx-3 md:mx-0"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {Children.toArray(
                  cartProducts.map((product) => (
                    <BillingProduct product={product} />
                  ))
                )}
              </div>

              <div className="mx-5">
                <SummeryCard products={cartProducts} />
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex justify-center items-center">
          <Button
            rounded="rounded-sm"
            padding="p-3"
            width="w-44"
            otherStyle="Order my-3"
            title={title}
            handleFunc={handleButton}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default CheckOutPage;
