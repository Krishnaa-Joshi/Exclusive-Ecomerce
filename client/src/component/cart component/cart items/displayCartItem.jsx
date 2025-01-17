// Hooks
import { useContext } from "react";
import { Context } from "@/context";
import { useNavigate } from "react-router-dom";

// Component
import DisplayCartProducts from "../Display Cart Products/displayCartProducts";
import SummeryCard from "@/component/Summery Card/summeryCard";
import Coupon from "@/component/Coupon/coupon";
import Button from "@/component/Button/Button";

function DisplayCart() {
  const { editCart, setEditCart, cartProducts } = useContext(Context);
  const navigate = useNavigate();

  const handleUpdateCart = () => {
    setEditCart(!editCart);
  };

  return (
    <>
      <div className="hidden sm:block">
        {/* Heading */}
        <div className="grid grid-cols-4 items-center justify-items-center mt-12">
          <div>
            <p className="font-semibold">Product</p>
          </div>
          <div>
            <p className="font-semibold">Price</p>
          </div>
          <div>
            <p className="font-semibold">Quatity</p>
          </div>
          <div>
            <p className="font-semibold">SubTotal</p>
          </div>
        </div>

        {/* Cart Products */}
        <div>
          <DisplayCartProducts />
        </div>

        <div className="flex justify-between my-5 mx-6 md:mx-14 lg:mx-24">
          {/*Return home Button */}
          <div>
            <button
              className="border-2 border-[#808080] font-semibold rounded-md p-2.5 text-sm w-36 md:w-40 lg:text-base lg:p-3 lg:w-48"
              onClick={() => navigate("/")}
            >
              Return To Shop
            </button>
          </div>

          {/* Update Cart Button */}
          <div>
            <button
              className="border-2 border-[#808080] font-semibold rounded-md p-2.5 text-sm w-32 md:w-36 lg:text-base lg:p-3 lg:w-44"
              onClick={handleUpdateCart}
            >
              {editCart ? "Done" : "Update Cart"}
            </button>
          </div>
        </div>

        {/* Coupon */}
        <div className="mt-10 ml-2 md:ml-6 lg:ml-24">
          <Coupon />
        </div>

        {/* Summery card */}
        <div className="border-2 border-black rounded-sm p-4 relative bottom-14 w-[45vw] left-[52vw] md:left-[55vw] md:w-[40vw] lg:left-[63vw] lg:w-[30vw]">
          <p className="font-semibold text-xl md:text-2xl ">Cart Total</p>
          <SummeryCard products={cartProducts} />
          {/* Checkout Button */}
          <div className="flex justify-center">
            <Button
              rounded="rounded-sm"
              padding="p-2.5 lg:p-3"
              width="w-44 md:w-56 lg:w-60"
              otherStyle="cursor-pointer"
              title="Procees To Checkout"
              handleFunc={() => navigate("/checkout")}
            />
          </div>
        </div>
      </div>
      <div className="sm:hidden">
        <div className="flex justify-center items-center my-8">
          <p className="text-2xl font-bold border-b-2 border-b-[#999999] p-1.5">{`Your Cart (${cartProducts.length})`}</p>
        </div>
        <div>
          <DisplayCartProducts />
        </div>

        <div className="border-2 border-black rounded-sm p-4 my-10 mx-4">
          <p className="font-semibold text-xl  ">Cart Total</p>
          <SummeryCard products={cartProducts} />
          {/* Checkout Button */}
          <div className="flex justify-center">
            <Button
              rounded="rounded-sm"
              padding="p-2.5"
              width="w-44"
              otherStyle="cursor-pointer"
              title="Procees To Checkout"
              handleFunc={() => navigate("/checkout")}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DisplayCart;
