// Hooks
import { Context } from "@/context";
import { useContext } from "react";

// Component
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
    <div className="flex w-[25vw] my-4 md:w-[30vw] lg:w-[38.7vw]">
      <input
        type="text"
        placeholder="Coupon Code"
        className="focus:outline-none border-2 border-[#252525] rounded-sm mr-2 text-sm p-1.5 w-36 md:text-base md:h-[44px] md:p-2 md:mr-3 md:w-40 lg:p-2 lg:h-12 lg:w-64 lg:mr-5"
      />
      <div className="flex flex-col items-center">
        <Button rounded="rounded-sm" padding=" md:p-2.5 lg:p-3" width="w-36 md:w-40 lg:w-48" title="Apply Coupon" handleFunc={handleApplyCoupon}/>
        {!couponValid && (
          <p className="text-red-500 mt-2 font-medium inline">Invalid Coupon</p>
        )}
      </div>
    </div>
  );
}

export default Coupon;
