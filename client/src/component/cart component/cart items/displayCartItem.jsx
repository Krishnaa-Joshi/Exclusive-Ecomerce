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
  const { editCart, setEditCart,cartProducts } = useContext(Context);
  const navigate = useNavigate();

  const handleUpdateCart = () => {
    setEditCart(!editCart);
  };

  return (
    <div>
      {/* Heading */}
      <div className="grid grid-cols-4  items-center justify-items-center mt-12">
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

      <div className="flex justify-between my-5 mx-24">
        {/*Return home Button */}
        <div>
          <button
            className="border-2 border-[#808080] rounded-md p-3 w-48 font-semibold"
            onClick={() => navigate("/")}
          >
            Return To Shop
          </button>
        </div>

        {/* Update Cart Button */}
        <div>
          <button
            className="border-2 border-[#808080] rounded-md p-3 w-44 font-semibold"
            onClick={handleUpdateCart}
          >
            {editCart ? "Done" : "Update Cart"}
          </button>
        </div>
      </div>

      {/* Coupon */}
      <div className="ml-24 mt-10">
        <Coupon/>
      </div>

      {/* Summery card */}
      <div className="border-2 border-black rounded-sm w-[30vw] p-4 relative left-[63vw] bottom-14">
        <p className="font-semibold text-2xl ">Cart Total</p>
        <SummeryCard products={cartProducts}/>
        {/* Checkout Button */}
        <div className="flex justify-center">
          <Button rounded="rounded-sm" padding="p-3" width="w-60" otherStyle="cursor-pointer" title="Procees To Checkout" handleFunc={() => navigate("/checkout")}/>
        </div>
      </div>
    </div>
  );
}

export default DisplayCart;
