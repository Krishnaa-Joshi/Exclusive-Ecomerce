// SVGs
import emptyCart from "../../../assets/cart assets/emptyCart.svg";

// Hooks
import { useNavigate } from "react-router-dom";

function EmptyCart() {
    const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <img src={emptyCart} alt="Empty cart" />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-5xl">{`Your cart is Empty`}</p>
        <p className="text-[#909090]  mt-2">
          Looks like you haven&apos;t made your choice yet...
        </p>
      </div>

      <div className="mt-5">
        <button
          className="bg-[#DB4444] p-2.5 rounded-lg w-48 text-white"
          onClick={() => navigate("/")}
        >
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default EmptyCart;
