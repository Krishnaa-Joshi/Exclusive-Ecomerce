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
import EmptyCart from "@/component/cart component/Empty Cart/emptyCart";

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
        <EmptyCart/>
      }
      
      <Footer />
    </div>
  );
}

export default CartPage;
