// PropTypes
import PropTypes from "prop-types";

// Hooks
import { useContext } from "react";
import { Context } from "@/context";

// SVGs
import incrementBtn from "../../../assets/cart assets/increment.svg";
import decrementBtn from "../../../assets/cart assets/decrement.svg";

function CartMobile({ product }) {
  const { cartProducts, handleIncrement, handleDecrement, setCartProducts } =
    useContext(Context);

  const handleRemove = () => {
    setCartProducts((prev) => {
      return prev.filter((item) => item.id !== product.id); // Remove the product with the matching id
    });
  };

  return (
    <>
      <div className="border-b-2 border-b-[#999999] py-4 mx-4">
        <div className="flex flex-col">
          <div className="flex items-center py-2">
            <div>
              <img
                src={product.images[0]}
                alt=""
                className="w-16 h-16 object-contain"
              />
            </div>
            <div className="ml-2">
              <p className="font-bold text-sm">{product.title}</p>
              <p className="font-medium text-sm">{`$ ${product.price}`}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between m-2">
          <div className="border-2 border-[#999999] p-1 rounded-lg w-[70px] flex items-center justify-evenly">
            <p className="text-lg">
              {cartProducts.find((item) => item.id === product.id)?.quantity}
            </p>
            <div className="">
              <img
                src={incrementBtn}
                alt=""
                className="h-[18px]"
                onClick={() => handleIncrement(product.id)}
              />
              <img
                src={decrementBtn}
                alt="Decrement"
                className={`h-[18px] ${
                  cartProducts.find((item) => item.id === product.id)
                    ?.quantity === 1
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() =>
                  cartProducts.find((item) => item.id === product.id)
                    ?.quantity > 1 && handleDecrement(product.id)
                }
              />
            </div>
          </div>
          <div className="flex justify-center items-center rounded-md p-1.5 border-2 border-[#808080] w-20" onClick={handleRemove}>
            <p>Delete</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartMobile;

CartMobile.propTypes = {
  product: PropTypes.object,
};
