// Hooks
import { useContext } from "react";
import { Context } from "@/context";

// SVGs
import incrementBtn from "../../../assets/cart assets/increment.svg";
import decrementBtn from "../../../assets/cart assets/decrement.svg";
import remove from "../../../assets/cart assets/remove.svg";

// PropTypes
import PropTypes from "prop-types";

function CartProduct({ product }) {
  const {
    editCart,
    cartProducts,
    setCartProducts,
    handleIncrement,
    handleDecrement,
  } = useContext(Context);

  // Remove Button
  const handleRemove = () => {
    setCartProducts((prev) => {
      return prev.filter((item) => item.id !== product.id); // Remove the product with the matching id
    });
  };

  return (
    <>
      <div className="grid grid-cols-4 items-center justify-items-center my-12">
        {/* Product Img and Name */}
        <div className="flex items-center w-full sm:justify-between sm:w-[23vw] lg:w-[15vw]">
          <div className="relative" onClick={handleRemove}>
            <img
              src={product.images[0]}
              alt="Product"
              className="h-16 w-28 md:h-20 md:w-36 lg:w-40"
            />
            {editCart ? (
              <img
                src={remove}
                alt="Remove Icon"
                className="absolute top-0 left-0 h-6 cursor-pointer "
              />
            ) : (
              ""
            )}
          </div>
          <p className="text-start w-[30vw] sm:text-sm md:text-base">
            {product.title}
          </p>
        </div>

        {/* Price */}
        <div>
          <p className="text-sm md:text-base">{`$ ${product.price}`}</p>
        </div>

        {/* Quantity Setter */}
        <div>
          <div className="border-2 border-[#999999] p-1 rounded-lg w-16 flex items-center justify-evenly md:w-20">
            <p className="md:text-xl">
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
        </div>

        <div className="">
          <p className="text-sm md:text-base">{`$ ${product.price}`}</p>
        </div>
      </div>
    </>
  );
}

export default CartProduct;

CartProduct.propTypes = {
  product: PropTypes.object,
};
