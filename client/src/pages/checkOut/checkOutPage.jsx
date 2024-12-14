import Footer from "@/component/common component/footer/footer";
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";
import Path from "@/component/common component/pages path/path";
import BillingDetails from "@/component/Checkout/Billing Detail/billingDetail";




import Checkout from "@/component/Checkout/checkout/checkout";

function CheckOutPage() {

  return (
    <>
      <HeroSection />
      <NavBar />
      <Path />

      <div className="h-[130vh]">
        <h1 className="text-4xl font-semibold my-10 ml-24">Billing Details</h1>
        <div className="flex justify-between w-[90vw]">
          <BillingDetails/>
          <Checkout/>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CheckOutPage;
