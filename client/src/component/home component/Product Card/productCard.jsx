// Library and Hooks
import { Context } from "@/context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// PropTypes
import PropTypes from "prop-types";

// SVGs
import EmptyStar from "../../../assets/Home assets/Product Card/emptyStar.svg";
import Star from "../../../assets/Home assets/Product Card/star.svg";
import wishlist from "../../../assets/Navbar assets/wishlist.svg";
import AddedTowishlist from "../../../assets/product Detail assests/AddedToWishlist.svg";
import cart from "../../../assets/wishlist assets/cart.svg";
import decrement from "../../../assets/Home assets/Product Card/decrement.svg";
import increment from "../../../assets/Home assets/Product Card/increment.svg";
import trash from "../../../assets/wishlist assets/delete.svg";

const ProductCard = ({ product, url }) => {
  const {
    wishlistProducts,
    setWhishlistProducts,
    cartProducts,
    setCartProducts,
    handleIncrement,
    handleDecrement,
    isAuth,
    currentPage,
  } = useContext(Context);

  const Navigate = useNavigate();

  // Calculate discounted price
  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  const discount = Math.round(product.discountPercentage);

  //  Add product to Wishlist
  const handleAddToWishlist = (product) => {
    if (!isAuth) {
      Navigate("/signUp");
      return;
    }
    setWhishlistProducts((prev) => {
      const isInWishlist = prev.some((item) => item.id === product.id); // Check if product already in wishlist
      if (isInWishlist) {
        console.log(`Product removed from wishlist: ${product.title}`);
        return prev.filter((item) => item.id !== product.id); // Remove if already in wishlist
      }
      console.log(`Product added to wishlist: ${product.title}`);
      return [...prev, product]; // Add if not in wishlist
    });
  };

  // handle seen button
  const handleSeen = () => {
    Navigate(`/product/${product.id}`);
    window.location.reload();
  };

  // Add product to Cart
  const handleAddToCart = (product) => {
    if (!isAuth) {
      Navigate("/signUp");
      return;
    }
    setCartProducts((prev) => {
      const isInCart = prev.some((item) => item.id === product.id);
      if (isInCart) {
        console.log(
          `Product already in cart: ${product.title}, Quantity:`,
          prev.find((item) => item.id === product.id).quantity
        );
        return prev; // If already in cart, do nothing
      }
      console.log(
        `Product added to cart: ${product.title}, Initial Quantity: 1`
      );
      return [...prev, { ...product, quantity: 1 }]; // Add product with initial quantity 1
    });
  };

  return (
    <div className="w-[40vw] h-[45vh] my-2 rounded-t-md overflow-hidden bg-white flex flex-col relative sm:w-[30vw] sm:h-[48vh] md:transform md:transition-transform md:duration-300 md:hover:scale-105 md:w-[23vw] lg:h-[50vh] xl:w-[18vw] 2xl:h-[52vh] 2xl:my-3 2xl:rounded-t-lg 2xl:mx-5">
      {/* Discount Badge */}
      {discount === 0 ? null : (
        <div className="z-10 bg-red-500 text-white absolute flex flex-col m-2 text-[10px] h-[30px] w-[30px] rounded-full items-center justify-center font-bold px-2 py-1 sm:text-xs sm:w-[35px] sm:h-[35px] xl:justify-start xl:items-start xl:h-auto xl:w-auto xl:flex-row xl:text-xs xl:rounded xl:m-2.5">
          <p className="xl:mr-1">{discount}% </p>
          <p>off</p>
        </div>
      )}

      {/* Action Icons */}
      <div className="z-10 absolute top-1.5 right-2 space-y-2 2xl:top-2">
        {/* wishlist and delete button */}
        {currentPage != "" ? (
          <button
            className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center shadow-md sm:w-[33px] sm:h-[33px] 2xl:w-8 2xl:h-8"
            onClick={() => handleAddToWishlist(product)}
          >
            <img
              src={
                url === "wishlist"
                  ? wishlistProducts.some((item) => item.id === product.id)
                    ? AddedTowishlist
                    : wishlist
                  : trash
              }
              alt=""
              className="w-[20px] sm:w-[24px] 2xl:w-auto"
            />
          </button>
        ) : (
          <button
            className="w-[30px] h-[30px] bg-white rounded-full flex items-center justify-center shadow-md sm:w-[33px] sm:h-[33px] 2xl:w-8 2xl:h-8"
            onClick={() => handleAddToWishlist(product)}
          >
            <img
              src={
                wishlistProducts.some((item) => item.id === product.id) &&
                isAuth
                  ? AddedTowishlist
                  : wishlist
              }
              alt=""
              className="w-[20px] sm:w-[24px] 2xl:w-auto"
            />
          </button>
        )}
      </div>
      {/* Product Image */}
      <div
        className="relative bg-[#F5F5F5] w-[40vw] h-[25vh] flex justify-center items-center cursor-pointer sm:w-[30vw] md:w-[23vw] xl:w-[18vw] 2xl:w-auto 2xl:h-48"
        onClick={handleSeen}
      >
        <div className="w-[30vw] h-[140px] flex justify-center 2xl:w-[190px] 2xl:h-[190px]">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-[30vw] object-contain 2xl:max-h-full 2xl:max-w-full 2xl:w-[190px]"
          />
        </div>
      </div>

      {/* Add to Cart Button */}
      {cartProducts.some((item) => item.id === product.id) ? (
        <div className="flex justify-around w-full items-center rounded-b-md bg-black py-2 text-white 2xl:rounded-b-lg">
          <img
            src={decrement}
            alt="decrement"
            onClick={() => handleDecrement(product.id)}
            className="cursor-pointer"
          />{" "}
          {/* decrement */}
          <p className="font-medium">
            {
              cartProducts.find((item) => item.id === product.id)?.quantity || 1 // Display quantity
            }
          </p>
          <img
            src={increment}
            alt="increment"
            onClick={() => handleIncrement(product.id)}
            className="cursor-pointer"
          />{" "}
          {/* increment */}
        </div>
      ) : (
        <button
          className="flex justify-center items-center w-full rounded-b-md font-bold bg-black text-white py-2 text-xs 2xl:text-sm 2xl:rounded-b-lg"
          onClick={() => handleAddToCart(product)}
        >
          <div>
            <img
              src={cart}
              className="w-[18px] sm:w-[20px] mr-2 2xl:w-auto"
              alt=""
            />
          </div>
          Add To Cart
        </button>
      )}

      {/* Product Details */}
      <div className="p-2 flex-1 flex flex-col justify-start">
        {/* Title */}
        <h3 className="text-xs font-bold line-clamp-2 sm:text-sm lg:text-base 2xl:text-lg 2xl:mb-1">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-center space-x-2 2xl:mb-1">
          <span className="text-red-500 font-bold text-sm lg:text-lg">
            ${discountedPrice}
          </span>
          <span className="line-through text-gray-500">${product.price}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center w-[100px] justify-between lg:w-28 2xl:justify-start 2xl:w-auto">
          <div className="flex w-[14px] lg:w-4 2xl:w-auto">
            {(() => {
              const stars = [];
              for (let i = 0; i < 5; i++) {
                if (i < product.rating) {
                  stars.push(<img key={i} src={Star} alt="Filled star" />);
                } else {
                  stars.push(<img key={i} src={EmptyStar} alt="Empty star" />);
                }
              }

              return stars;
            })()}
          </div>
          <span className="text-gray-500 text-xs ml-2 sm:text-sm lg:text-base 2xl:text-lg">
            ({product.rating.toFixed(1)})
          </span>
        </div>
      </div>
    </div>
  );
};

// Validating prop types
ProductCard.propTypes = {
  product: PropTypes.object,
  url: PropTypes.string,
};

export default ProductCard;
