// Hooks
import { Children, useContext, useState } from "react";
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
import SummeryCard from "@/component/Summery Card/summeryCard";
import Message from "@/component/Message/message";
import Coupon from "@/component/Coupon/coupon";
import Button from "@/component/Button/Button";

function Checkout() {
  const {
    cartProducts,
    setCartProducts,
    error,
    setError,
    setErrorType,
    profileData,
    setSection,
    setOrderedDetails,
    orderNoGenrator,
    totalPrice,
  } = useContext(Context);
  const [check, setCheck] = useState("COD");
  const navigate = useNavigate();

  // Calculate Total Price
  const total = totalPrice(cartProducts);

  // Switch payment Mode
  const payementMode = (Mode) => {
    setCheck(Mode);
  };

  // check if Address object of ProfileData is empty or Not
  function isAddressEmpty() {
    return Object.values(profileData.address).every(
      (value) => !value || value.trim() === ""
    );
  }

  const handlePlaceOrder = () => {
    if (isAddressEmpty()) {
      setErrorType(false);
      setError("Address is Missing");
      setSection("Address");
      navigate("/account");
    } else {
      // Get current date
      const currentDate = new Date();
      const orderedDate = currentDate.toLocaleDateString();

      // Calculate delivery date (2 days later)
      const deliveryDateObj = new Date(currentDate);
      deliveryDateObj.setDate(currentDate.getDate() + 2);
      const deliveryDate = deliveryDateObj.toLocaleDateString();

      // Create the new order object
      const newOrder = {
        orderNo: orderNoGenrator(),
        totalPrice: total.toFixed(2),
        products: cartProducts,
        date: orderedDate,
        status: "IT'S ORDERED!",
        deliveryDate,
        viewOrder: false,
      };

      // Update the orderedDetails state
      setOrderedDetails((prevDetails) => [...prevDetails, newOrder]);
      setCartProducts([]);
      navigate("/orderPlaced");
    }
  };

  return (
    <div className="w-96">
      {/* Error */}
      {error ? <Message /> : null}

      {/* Products */}
      <div
        className={`overflow-y-auto ${
          cartProducts.length > 2 ? "max-h-48" : ""
        }`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {Children.toArray(
          cartProducts.map((product) => <BillingProduct product={product} />)
        )}
      </div>

      {/* Summery */}
      <SummeryCard products={cartProducts} />

      {/* Payment Mode */}
      <div>
        <div className="flex justify-between">
          {/* Card */}
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
        {/* Cash on Delivery */}
        <div className="flex" onClick={() => payementMode("COD")}>
          <img
            src={check === "COD" ? Selected : NotSelceted}
            alt=""
            className="w-4 mr-2"
          />
          <p className="font-medium text-xl">Cash on Delivery</p>
        </div>

        {/* Coupon */}
        <Coupon />

        {/* Place Order */}
        <Button
          rounded="rounded-sm"
          padding="p-3"
          width="w-44"
          otherStyle="Order my-3"
          title="Place Order"
          handleFunc={handlePlaceOrder}
        />
      </div>
    </div>
  );
}

export default Checkout;
