// Main Component
import Footer from "@/component/common component/footer/footer";
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";

// Auth Component
import Login from "@/component/Auth Component/Login/Login";
import Signup from "@/component/Auth Component/Signup/signup";

// Hooks
import { Context } from "@/context";
import { useContext } from "react";

// Image
import img from "../../assets/Auth Assets/img.avif";


function AuthPage() {
  const { isLogin } = useContext(Context);

  return (
    <>
      <HeroSection />
      <NavBar />
      <div className="sm:flex">
        <div className="flex justify-center mx-5 my-10 sm:mx-0 sm:block sm:h-screen sm:w-54vw sm:my-28 ">
          <img src={img} alt="" className="rounded-sm w-[95vw] sm:w-[50vw] sm:h-[100vh] md:w-[54vw] md:h-[90vh] " />
        </div>
        {isLogin ? <Login /> : <Signup />}
      </div>

      <Footer />
    </>
  );
}

export default AuthPage;
