// Main Component
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";
import Path from "@/component/common component/pages path/path";
import Footer from "@/component/common component/footer/footer";

// About component
import InvestorCard from "@/component/about Component/Invertor card";
import AboutCard from "@/component/about Component/About-card";

// Images and Svgs
import TomCruise from "../../assets/About assets/Tom-Cruise.png"
import girls from "../../assets/About assets/girl.jpg"
import EmmaWatson from "../../assets/About assets/Emma-Watson.png"
import willSmith from "../../assets/About assets/will-smith.png"
import store from "../../assets/About assets/store.svg"
import MonthlySale from "../../assets/About assets/dollor.svg"
import CustomerActive from "../../assets/About assets/active-customer.svg"
import AnnualSale from "../../assets/About assets/sale.svg"
import Delivery from "../../assets/About assets/delivery.svg"
import CustomerCare from "../../assets/About assets/customer-care.svg"
import MoneyBackGuarantee from "../../assets/About assets/money-back-guarantee.svg"

function AboutPage(){
    return(
        <>
            <HeroSection/>
            <NavBar/>
            <div className="">
                {/* Path */}
                <Path/>
                
                {/* Info */}
                <div className="flex h-[85vh] mt-20">
                    <div className=" h-4/5 flex flex-col justify-center mx-[97px] ">
                        <h1 className="text-6xl font-semibold mb-14">Our Story</h1>
                        <p className="font-medium">Launced in 2015, Exclusive is South Asia&apos;s premier online shopping makterplace with an active presense 
                        in India. Supported by wide range of tailored marketing, data and service solutions, Exclusive 
                        has 10,500 sallers and 300 brands and serves 3 millioons customers across the region.<br/><br/> Exclusive has 
                        more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in 
                        categories ranging from consumer.</p>
                    </div>
                    <img className="h-[78vh] w-[150vh]" src={girls} alt="" />
                </div>
                
                {/* Services */}
                <div className="flex justify-center my-20">
                    <AboutCard figure="10.5K" detail="Sallers active our site" pathSrc={store} />
                    <AboutCard figure="33K" detail="Monthly Product Sale" box={false} bgColor="#DB4444" color1="#E67C7C"  color2="white"  pathSrc={MonthlySale}/>
                    <AboutCard figure="45.5K" detail="Customer Active in our Site" pathSrc={CustomerActive} />
                    <AboutCard figure="25K" detail="Annual gross Sale on our Site" pathSrc={AnnualSale}/>
                </div>

                {/* Company investor */}
                <div className="flex flex-col">
                    <div className="flex justify-center">
                        <InvestorCard name={"Tom Cruise"} detail={"Founder & Chairman"} srcPath={TomCruise} width="96%"/>
                        <InvestorCard name={"Emma Watson"} detail={"Managing Director"} srcPath={EmmaWatson} width="100%"/>
                        <InvestorCard name={"Will Smith"} detail={"Producer Designer"} srcPath={willSmith} width="67%" />
                    </div>
                </div>
                
                {/* Benifit */}
                <div className="flex justify-center items-center h-[55vh]">
                    <AboutCard figure="FREE AND FAST DELIVERY" detail="Free delivery for all order above $250" width="20%" fontSize="22px" mBottom={false} fontWeight="400" box={false} pathSrc={Delivery} />
                    <AboutCard figure="24/7 Customer Service" detail="Friendly 24/7 customer support" width="20%" fontSize="22px" mBottom={false} fontWeight="400" box={false} pathSrc={CustomerCare}/>
                    <AboutCard figure="MONEY BACK GUARANTEE" detail="We return money within 30 days" width="20%" fontSize="22px" mBottom={false} fontWeight="400" box={false} pathSrc={MoneyBackGuarantee}/>
                </div>
            </div>
            <Footer/>
        </>
    )
} 

export default AboutPage;