// Library and Hooks
import { Context } from "@/context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// PropTypes
import PropTypes from "prop-types";

// SVGs
import seen from "../../../assets/Home assets/Product Card/eye.svg";
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
    currentPage
  } = useContext(Context);

  const Navigate = useNavigate();

  // Calculate discounted price
  const discountedPrice = (
    product.price -
    (product.price * product.discountPercentage) / 100
  ).toFixed(2);

  //  Add product to Wishlist
  const handleAddToWishlist = (product) => {
    if(!isAuth){
      Navigate("/signUp");
      return ;
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
    if(!isAuth){
      Navigate("/signUp");
      return ;
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
    <div className="w-60 h-[335px] my-3 rounded-t-lg  overflow-hidden mx-5 bg-white flex flex-col relative transform transition-transform duration-300 hover:scale-105">
      {/* Discount Badge */}
      <div className="absolute bg-red-500 text-white text-xs font-bold px-2 py-1 rounded m-2.5 z-10">
        -{product.discountPercentage}%
      </div>

      {/* Product Image */}
      <div className="relative bg-[#F5F5F5] h-48 flex justify-center items-center">
        <img
          src={product.images[0]}
          alt={product.title}
          className="max-h-full max-w-full object-contain"
        />

        {/* Action Icons */}
        <div className="absolute top-2 right-2 space-y-2">
          {/* wishlist and delete button */}
          {currentPage != "" ? (
            <button
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
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
              />
            </button>
          ) : (
            <button
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md"
              onClick={() => handleAddToWishlist(product)}
            >
              <img
                src={
                  (wishlistProducts.some((item) => item.id === product.id) && isAuth)
                    ? AddedTowishlist
                    : wishlist
                }
                alt=""
              />
            </button>
          )}
          {/* Seen button */}
          <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
            <img
              src={seen}
              alt=""
              onClick={handleSeen }
            />
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      {cartProducts.some((item) => item.id === product.id) ? (
        <div className="flex justify-around w-full items-center rounded-b-lg bg-black py-2 text-white">
          <img
            src={decrement}
            alt="decrement"
            onClick={() => handleDecrement(product.id)}
            className="cursor-pointer"
          /> {/* decrement */}
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
          /> {/* increment */}
        </div>
      ) : (
        <button
          className="flex justify-center items-center w-full rounded-b-lg bg-black text-white py-2 text-sm font-bold"
          onClick={() => handleAddToCart(product)}
        >
          <div>
            <img src={cart} className="mr-2" alt="" />
          </div>
          Add To Cart
        </button>
      )}

      {/* Product Details */}
      <div className="p-2  flex-1 flex flex-col justify-start">
        
        {/* Title */}
        <h3 className="text-sm font-bold mb-1 line-clamp-2">{product.title}</h3>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <span className="text-red-500 font-bold text-lg mb-1">
            ${discountedPrice}
          </span>
          <span className="line-through text-gray-500">${product.price}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center">
          <div className=" flex">
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
          <span className="text-gray-500 text-sm ml-2">
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
}

export default ProductCard;
