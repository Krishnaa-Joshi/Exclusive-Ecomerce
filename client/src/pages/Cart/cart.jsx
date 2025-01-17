// Main component
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";
import Path from "@/component/common component/pages path/path";
import Footer from "@/component/common component/footer/footer";

// Hooks
import { useContext } from "react";
import { Context } from "@/context";

// Component
import DisplayCart from "@/component/cart component/cart items/displayCartItem";
import EmptyState from "@/component/Account/Empty State/emptyState";

// SVGs
import emptyCart from "../../assets/cart assets/emptyCart.svg";

function CartPage() {
  const { cartProducts } = useContext(Context);


  return (
    <div>
      <HeroSection />
      <NavBar />
      <Path />
      {
        cartProducts.length > 0 ? 
        <DisplayCart/> :
        <div className="flex justify-center items-center h-[75vh] md:h-[80vh] xl:w-auto xl:block">
          <EmptyState img={emptyCart} heading={"Your cart is Empty"} subLine={"Looks like you haven't made your choice yet..."} />
        </div>
          
      }
      
      <Footer />
    </div>
  );
}

export default CartPage;
