// SVGs
import incrementBtn from "../../../assets/cart assets/increment.svg";
import decrementBtn from "../../../assets/cart assets/decrement.svg";
import remove from "../../../assets/cart assets/remove.svg";
import { useContext } from "react";
import { Context } from "@/context";

function CardProduct({ product }) {
  const {
    editCart,
    setEditCart,
    cartProducts,
    setCartProducts,
    handleIncrement,
    handleDecrement,
  } = useContext(Context);

  const handleRemove = () => {
    setCartProducts((prev) => {
      return prev.filter((item) => item.id !== product.id); // Remove the product with the matching id
    });
  };

  return (
    <div className="grid grid-cols-4 items-center justify-items-center my-12">
      <div className="flex items-center w-[15vw] justify-between">
        <div className="relative" onClick={handleRemove}>
          <img src={product.images[0]} alt="Product" className="h-20 w-36" />
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
        <p className="text-start w-[20vw]">{product.title}</p>
      </div>
      <div>
        <p>{`$ ${product.price}`}</p>
      </div>
      <div className="">
        <div className="border-2 border-[#999999] p-1 rounded-lg w-20 flex items-center justify-evenly">
          <p className="text-xl">
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
                cartProducts.find((item) => item.id === product.id)?.quantity >
                  1 && handleDecrement(product.id)
              }
            />
          </div>
        </div>
      </div>
      <div>
        <p>{`$ ${product.price}`}</p>
      </div>
    </div>
  );
}

export default CardProduct;
