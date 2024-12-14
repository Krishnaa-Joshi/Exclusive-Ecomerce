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
import img from "../../assets/Auth Assets/img.avif"

function AuthPage(){

    const { isLogin } = useContext(Context);

    return(
        <>
            <HeroSection/>
            <NavBar/>
            <div className="flex">
                <div className="h-screen w-54vw my-28">
                    <img src={img} alt="" className="w-[54vw] h-[90vh]"/>
                </div>
                { isLogin ? <Login/> : <Signup/> }
            </div>

            <Footer/>
        </>
    )
} 

export default AuthPage;