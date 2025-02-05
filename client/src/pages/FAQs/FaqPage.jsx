// Hooks
import { useState } from "react";

// Main Component
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";
import Footer from "@/component/common component/footer/footer";

// SVGs
import FAQImg from "../../assets/FAQ assests/FAQImg.svg";
import Show from "../../assets/FAQ assests/plus.svg";
import Hide from "../../assets/product Detail assests/minus.svg";

// Component
import FAQData from "@/component/FAQs Component/FAQData";

function FAQPage() {
  const [display, setDisplay] = useState(Array(FAQData.length).fill(false));

  // Handle the toggle display of each FAQ
  const handleDisplay = (index) => {
    setDisplay((prevDisplay) => {
      const newDisplay = [...prevDisplay];
      newDisplay[index] = !newDisplay[index];
      return newDisplay;
    });
  };

  return (
    <>
      <HeroSection />
      <NavBar />
      {/* heading */}
      <div className="h-[30vh] sm:h-[35vh] lg:h-[60vh] xl:h-[45vh]">
        <div className="flex justify-center flex-col items-center">
          <h1 className="font-bold mt-10 text-center text-4xl sm:text-5xl md:text-5xl  lg:w-[45vw] lg:text-7xl">
            Frequently Asked <p className="text-[#FC3203] text-center sm:m-2">Questions</p>
          </h1>
          <p className="text-[#808080] text-center text-sm w-64 lg:w-[19vw]">
            Do you need some help with something or do you have any questions on
            some features ?
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="flex items-center justify-center md:justify-evenly">
        {/* Banner */}
        <div>
          <img src={FAQImg} alt="FAQImg" className="hidden md:block"/>
        </div>
        {/* FAQ Question and Answer */}
        <div className="bg-[#F8F4EB] rounded-lg mx-5 w-[90vw] sm:mx-7 lg:w-[55vw]">
          {FAQData.map((faq, index) => (
            <div key={index} className={`p-5 border-b-2 mx-5 ${index === FAQData.length - 1  ? 'mb-5' : ''}`}>
              <div className="flex justify-between p-1.5">
                <p className="font-semibold">{faq.question}</p>
                <img
                  src={display[index] ? Hide : Show} 
                  alt="Toggle"
                  onClick={() => handleDisplay(index)} 
                  className="cursor-pointer"
                />
              </div>
              {display[index] && <p className="text-[#808080] font-medium m-2 ">{faq.answer}</p>}{" "}
            </div>
          ))}
        </div>
      </div>

      {/* Email For Other Quiry */}
      <div className="flex justify-center items-center flex-col h-[40vh] sm:h-80">
        <h1 className="text-center font-bold text-3xl">
          Have any other questions ?
        </h1>
        <p className="text-[#808080] text-center w-60 lg:w-[19vw]">
          Don&apos;t hesitate to send us an email with your enquiry or statement
          at:
        </p>
        <p className="bg-[#F8F4EB] p-3 my-3 w-[220px] font-semibold rounded-md text-center">
          support@exclusive.com
        </p>
      </div>

      <Footer />
    </>
  );
}

export default FAQPage;
