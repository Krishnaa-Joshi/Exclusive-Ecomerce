// Hooks
import { useContext, useState } from "react";
import { Context } from "@/context";

// Checkout Component
import BillingProduct from "@/component/Checkout/Billing Product/billingProduct";

// SVGS
import Visa from "../../../assets/Checkout assets/Visa.svg";
import MasterCard from "../../../assets/Checkout assets/masterCard.svg";
import NotSelceted from "../../../assets/Checkout assets/radio.svg";
import Selected from "../../../assets/Checkout assets/radioCheck.svg";
import CardDetails from "../Card Details/CardDetails";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const { cartProducts } = useContext(Context);
  const [check, setCheck] = useState("COD");
  const navigate = useNavigate();
  const [couponValid, setCouponValid] = useState(true);

  const totalPrice = cartProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const payementMode = (Mode) => {
    setCheck(Mode);
  };

  const handleApplyCoupon = () => {
    const isCouponValid = false;
    setCouponValid(isCouponValid);

    // Reset coupon validity back to true after 5 seconds
    setTimeout(() => {
      setCouponValid(true);
    }, 5000); // 5000ms = 5 seconds
  };

  return (
    <div className="w-96">
      <div
        className={`overflow-y-auto ${
          cartProducts.length > 2 ? "max-h-48" : ""
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {cartProducts.map((product) => (
          <BillingProduct key={product.id} product={product} />
        ))}
      </div>

      <div>
        <div className="flex font-medium justify-between p-2.5 my-2.5 border-b-2 border-b-[#999999]">
          <p>Subtotal: </p>
          <p>{`$${totalPrice.toFixed(2)}`}</p>
        </div>
        <div className="flex font-medium justify-between p-2.5 my-2.5 border-b-2 border-b-[#999999]">
          <p>Shipping: </p>
          <p className="text-green-600">Free</p>
        </div>
        <div className="flex font-medium justify-between p-2.5 my-2.5">
          <p>Total: </p>
          <p>{`$${totalPrice.toFixed(2)}`}</p>
        </div>
      </div>

      <div>
        <div className="flex justify-between">
          <div className="my-3 flex" onClick={() => payementMode("Bank")}>
            <img
              src={check === "Bank" ? Selected : NotSelceted}
              alt=""
              className="w-4 mr-2"
            />
            <div className="flex justify-between w-[24vw]">
              <p className="font-medium text-xl">Credit Card or Debit Card</p>
              <div className="flex">
                <img src={Visa} alt="Visa" />
                <img src={MasterCard} alt="MasterCard" />
              </div>
            </div>
          </div>
        </div>
        {check === "Bank" ? (
          <div>
            <CardDetails />
          </div>
        ) : (
          ""
        )}
        <div className="flex" onClick={() => payementMode("COD")}>
          <img
            src={check === "COD" ? Selected : NotSelceted}
            alt=""
            className="w-4 mr-2"
          />
          <p className="font-medium text-xl">Cash on Delivery</p>
        </div>
        <div className="flex  w-[38.7vw] my-4">
          <input
            type="text"
            placeholder="Coupon Code"
            className="focus:outline-none border-2 border-[#252525] rounded-sm p-2 h-12 w-64 mr-5"
          />
          <div className="flex flex-col items-center">
            <button
              className="bg-[#DB4444] text-white rounded-sm p-3 w-48"
              onClick={handleApplyCoupon}
            >
              Apply Coupon
            </button>
            {!couponValid && (
              <p className="text-red-500 mt-2 font-medium">Invalid Coupon</p>
            )}
          </div>
        </div>
        <button className="bg-[#DB4444] text-white rounded-sm p-3 w-44 Place Order my-3" onClick={()=>navigate("/orderPlaced")}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
