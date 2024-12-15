import { Context } from "@/context";
import { useContext } from "react";
import Button from "../Button/Button";

function Coupon() {

  const {couponValid, setCouponValid} = useContext(Context);

  // handle Coupon
  const handleApplyCoupon = () => {
    const isCouponValid = false;
    setCouponValid(isCouponValid);

    // Reset coupon validity back to true after 5 seconds
    setTimeout(() => {
      setCouponValid(true);
    }, 5000); // 5000ms = 5 seconds
  };

  return (
    <div className="flex  w-[38.7vw] my-4">
      <input
        type="text"
        placeholder="Coupon Code"
        className="focus:outline-none border-2 border-[#252525] rounded-sm p-2 h-12 w-64 mr-5"
      />
      <div className="flex flex-col items-center">
        <Button rounded="rounded-sm" padding="p-3" width="w-48" title="Apply Coupon" handleFunc={handleApplyCoupon}/>
        {!couponValid && (
          <p className="text-red-500 mt-2 font-medium inline">Invalid Coupon</p>
        )}
      </div>
    </div>
  );
}

export default Coupon;
