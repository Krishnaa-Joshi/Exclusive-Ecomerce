// Hooks
import { Children, useContext } from "react";
import { Context } from "@/context";

// Checkout Component
import BillingProduct from "@/component/Checkout/Billing Product/billingProduct";
import SummeryCard from "@/component/Summery Card/summeryCard";
import Message from "@/component/Message/message";
import Coupon from "@/component/Coupon/coupon";
import Button from "@/component/Button/Button";
import Payment from "../Payment/payment";

function Checkout() {
  const { cartProducts, error, handlePlaceOrder } = useContext(Context);

  return (
    <div className="md:w-80 lg:w-96">
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

      <div>
        {/* Payment Mode */}
        <Payment />

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
