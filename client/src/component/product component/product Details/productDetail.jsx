// SVGs
import EmptyStar from "../../../assets/Home assets/Product Card/emptyStar.svg";
import Star from "../../../assets/Home assets/Product Card/star.svg";
import decrement from "../../../assets/product Detail assests/minus.svg";
import increment from "../../../assets/product Detail assests/plus.svg";
import wishlist from "../../../assets/Navbar assets/wishlist.svg";
import AddedTowishlist from "../../../assets/product Detail assests/AddedToWishlist.svg";
import Delivery from "../../../assets/product Detail assests/delivery.svg";
import returnDelivery from "../../../assets/product Detail assests/returnDelivery.svg";
import cart from "../../../assets/wishlist assets/cart.svg";

// Hooks
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "@/context";

// PropTypes
import PropTypes from "prop-types";

// Component
import DeliveryService from "../Delivery Service/service";
import Button from "@/component/Button/Button";

function ProductDetails({ product }) {
  const navigate = useNavigate();
  const {
    wishlistProducts,
    setWhishlistProducts,
    cartProducts,
    setCartProducts,
    handleIncrement,
    handleDecrement,
    isAuth
  } = useContext(Context);

  // Add product to cart
  const handleAddToCart = (product) => {
    if(!isAuth){
      navigate("/signUp");
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

  // handle Buy Product
  const handleBuyNow = () => {
    if(!isAuth){
      navigate("/signUp");
      return ;
    }
    navigate("/checkout");
  };

  // add product to wishlist
  const handleAddToWishlist = (product) => {
    if(!isAuth){
      navigate("/signUp");
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

  return (
    <div className="h-screen mr-16">
      {/* title */}
      <h1 className="text-2xl font-semibold my-2">{product.title}</h1>
      {/* Rating */}
      <div className="flex items-center my-2">
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
          {`( ${product.rating.toFixed(1)} Reviews )`}
        </span>
        {/* In Stock or Not */}
        <p className="mx-2.5"> | </p>
        <p className={product.stock !== 0 ? "text-green-500" : "text-red-500"}>
          {product.stock !== 0 ? "In Stock" : "Out of Stock"}
        </p>
      </div>
      {/* Price */}
      <div className="text-2xl font-medium mb-5">{`$${product.price}`}</div>
      {/* Description */}
      <div className="w-[25vw] pb-5 border-b-2 border-b-[#999999]">
        {product.description}
      </div>
      {/* Add to Cart Button */}
      <div className="flex my-4 items-center">
        {cartProducts.some((item) => item.id === product.id) ? (
          <div className="flex my-3">
            <img
              src={decrement}
              alt="decrement"
              onClick={() => handleDecrement(product.id)}
              className="border-2 border-[#999999] p-2 rounded-l-md border-r-0 cursor-pointer"
            /> {/* Decrement */}
            <p className="border-2 border-[#999999] p-1.5 w-[70px] text-center border-r-0 text-xl font-medium">
              {
                cartProducts.find((item) => item.id === product.id)?.quantity ||
                  1 // Display quantity
              }
            </p>
            <img
              src={increment}
              alt="increment"
              onClick={() => handleIncrement(product.id)}
              className="bg-[#DB4444] p-2 rounded-r-md cursor-pointer"
            /> {/* Increment */}
          </div>
        ) : (
          <button
            className="flex justify-center items-center w-40 rounded-md bg-[#DB4444] text-white p-2.5 text-sm font-bold"
            onClick={() => handleAddToCart(product)}
          >
            <div>
              <img src={cart} className="mr-2" alt="" />
            </div>
            Add To Cart
          </button>
        )}
        {/* Buy Now Button */}
        <div>
          <Button padding="p-2.5" rounded="rounded-sm" width="w-40" handleFunc={handleBuyNow} title="Buy Now" otherStyle="m-3 cursor-pointer"/>
        </div>
        {/* Wishlist */}
        <div
          className="my-3 border-2 border-[#999999] p-2 rounded-md cursor-pointer"
          onClick={() => handleAddToWishlist(product)}
        >
          <img
            src={
              wishlistProducts.some((item) => item.id === product.id)
                ? AddedTowishlist 
                : wishlist 
            }
            alt="wishlist icon"
          />
        </div>
      </div>

      {/* Free Delivery and Return Policy */}
      <div className="border-2 border-[#999999] rounded-md w-96 my-7">
        <DeliveryService img={Delivery} heading={"Free Delivery"} description={"Enter your postal code for Delivery Availability"}/>
        <div className="border-b-2 border-b-[#999999]"></div>
        <DeliveryService img={returnDelivery} heading={"Return Delivery"} description={"Free 30 Days Delivery Returns. Details"}/>
      </div>
    </div>
  );
}

// Validating prop types
ProductDetails.propTypes = {
  product: PropTypes.object,
}

export default ProductDetails;
