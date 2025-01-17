// Main Component
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";
import Path from "@/component/common component/pages path/path";
import Footer from "@/component/common component/footer/footer";

// About component
import InvestorCard from "@/component/about Component/Investor card";
import AboutCard from "@/component/about Component/About card";

// Images and Svgs
import girls from "../../assets/About assets/girl.jpg";
import girls2 from "../../assets/About assets/girl2.jpg";
import TomCruise from "../../assets/About assets/tomCruise.svg";
import Emma from "../../assets/About assets/Emma.svg";
import willSmith from "../../assets/About assets/willSmith.svg";
import store from "../../assets/About assets/services/home.svg";
import MonthlySale from "../../assets/About assets/services/dollor.svg";
import CustomerActive from "../../assets/About assets/services/bag.svg";
import AnnualSale from "../../assets/About assets/services/moneyBag.svg";
import Delivery from "../../assets/About assets/services/delivery.svg";
import CustomerCare from "../../assets/About assets/services/customerService.svg";
import MoneyBackGuarantee from "../../assets/About assets/services/moneyBack.svg";

function AboutPage() {
  return (
    <>
      <HeroSection />
      <NavBar />
      <div className="">
        {/* Path */}
        <Path />

        {/* Info */}
        <div className="mt-6 sm:flex sm:h-[85vh] md:mt-10 lg:mt-20">
          <div className="mx-2 sm:hidden">
            <img src={girls2} alt="" className="rounded-md" />
          </div>
          <div className="mx-5 sm:flex sm:flex-col sm:justify-center sm:mx-4 md:h-4/5 md:mx-7 lg:mx-10 xl:mx-[97px] ">
            <h1 className="text-4xl my-3 font-semibold text-center sm:my-1 sm:mb-7 sm:text-start md:text-5xl md:my-8 lg:text-6xl lg:mb-14 lg:my-0">
              Our Story
            </h1>
            <p className="font-medium ">
              Launced in 2015, Exclusive is South Asia&apos;s premier online
              shopping makterplace with an active presense in India. Supported
              by wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sallers and 300 brands and serves 3 millioons
              customers across the region.
            </p>
            <p className="font-medium mt-2 sm:mt-3 md:mt-4">
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </p>
          </div>
          <div className="sm:flex sm:items-center">
            <img
                className="hidden w-[150vw] sm:block sm:w-[127rem] sm:h-[70vh] md:h-[80vh] lg:h-[80vh] xl:w-[200vw] 2xl:w-[130vw]"
                src={girls}
                alt=""
            />
          </div>
        </div>

        {/* Services */}
        <div className="my-10 md:flex md:justify-center md:my-20">
          <div className="flex justify-center">
            <AboutCard
              figure="10.5K"
              detail="Sallers active our site"
              pathSrc={store}
            />
            <AboutCard
              figure="33K"
              detail="Monthly Product Sale"
              box={false}
              bgColor="bg-[#DB4444]"
              color="text-white"
              pathSrc={MonthlySale}
            />
          </div>
          <div className="flex justify-center">
            <AboutCard
              figure="45.5K"
              detail="Customer Active in our Site"
              pathSrc={CustomerActive}
            />
            <AboutCard
              figure="25K"
              detail="Annual gross Sale on our Site"
              pathSrc={AnnualSale}
            />
          </div>
        </div>

        {/* Company investor */}
        <div className="sm:flex sm:flex-col">
          <div className="text-3xl my-5 font-bold text-center  sm:my-10 sm:text-4xl md:text-5xl md:my-12">
            <p>Our Team</p>
          </div>
          <div className="sm:flex sm:justify-center">
            <div className="flex justify-center sm:inline-flex">
              <InvestorCard
                name={"Tom Cruise"}
                detail={"Founder & Chairman"}
                srcPath={TomCruise}
                width="w-[28vw] sm:w-[19.7vw] lg:w-[17vw] xl:w-[14.5vw]"
              />
              <InvestorCard
                name={"Emma Watson"}
                detail={"Managing Director"}
                srcPath={Emma}
                width="w-[35vw] sm:w-[24vw] lg:w-[21vw]  xl:w-[18.2vw]"
              />
            </div>
            <div className="flex justify-center my-5 sm:inline-flex sm:my-0">
              <InvestorCard
                name={"Will Smith"}
                detail={"Producer Designer"}
                srcPath={willSmith}
                width="w-[38vw] md:w-[27vw] lg:w-[23.5vw] xl:w-[20vw]"
              />
            </div>
          </div>
        </div>

        {/* Benifit */}
        <div className=" mb-14 text-center md:h-[55vh]">
          <div className="text-3xl mt-8 font-bold text-center sm:my-10 sm:text-4xl md:mt-20 md:my-8 lg:mb-10">
            <p>Services</p>
          </div>
          <div className="flex justify-center my-2 sm:my-0 md:inline-flex">
            <AboutCard
              figure="Free and Fast Delivery"
              detail="Free delivery for all order above $140"
              box={false}
              width="w-[55vw] sm:w-[34vw] md:w-[29vw] lg:w-[30vw] xl:w-[20vw]"
              height="h-[25vh]"
              fontSize="text-lg sm:text-2xl"
              fontWeight="font-semibold"
              pathSrc={Delivery}
            />
            <AboutCard
              figure="24/7 Customer Service"
              detail="Friendly 24/7 customer support"
              box={false}
              width="w-[55vw] sm:w-[35vw] md:w-[29.8vw] lg:w-[30vw] xl:w-[20vw]"
              height="h-[25vh]"
              fontSize="text-lg sm:text-2xl"
              fontWeight="font-semibold"
              pathSrc={CustomerCare}
            />
          </div>
          <div className="flex justify-center md:inline-flex ">
            <AboutCard
              figure="Money Back Guarantee"
              detail="We return money in 30 days"
              box={false}
              width="w-[45vw] sm:w-[36vw] md:w-[30.5vw] lg:w-[30vw] xl:w-[20vw]"
              height="h-[25vh]"
              fontSize="text-lg sm:text-2xl"
              fontWeight="font-semibold"
              pathSrc={MoneyBackGuarantee}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;
