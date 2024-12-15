// Main Component
import Footer from "@/component/common component/footer/footer";
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";
import Path from "@/component/common component/pages path/path";

// States
import { useState } from "react";

// Svgs
import Phone from "../../assets/Contact assets/phone.svg"
import Message from "../../assets/Contact assets/message.svg"
import ContactInfo from "@/component/Contact Component/ContactInfo";
import Button from "@/component/Button/Button";

function ContactPage() {

  const [message,setMessage]  = useState({
    name: "",
    email: "",
    phoneNo: "",
    query: "",
  })

  const handleChange = (e) =>{
    setMessage({
      ...message,
      [e.target.name] : e.target.value,
    });
  }

  return (
    <>
      <HeroSection />
      <NavBar />
      {/* Path */}
      <Path />

      <div className="flex justify-evenly items-center h-[77vh] mb-28  focus:outline-none">
        {/* Contact info */}
        <div>
          <div className="relative bottom-[4vh] border-b-2 border-b-[#808080] h-[20vh]">
            <ContactInfo img={Phone} heading={"Call To Us"} service={"We are available 24/7,7 days a week."} contactDetail={"Phone: +8801661122"}/>
          </div>
          <div>
            <ContactInfo img={Message} heading={"Write To Us"} service={"Fill out our form and we will contact you within 24 hours."} contactDetail={"Email: customer@exclusive.com"}/>
          </div>
        </div>

        {/* Handle user Query */}
        <form action="">
            <div>
                <input type="text" name="name" value={message.name} onChange={handleChange} placeholder="Your Name" required className="bg-[#F5F5F5] p-2.5 rounded-md mx-2 w-56 focus:outline-none"/>
                <input type="email" name="email" value={message.email} onChange={handleChange} placeholder="Your Email" required className="bg-[#F5F5F5] p-2.5 rounded-md mx-2 w-56 focus:outline-none"/>
                <input type="tel" name="phoneNo" value={message.phoneNo} onChange={handleChange} placeholder="Your PhoneNo." required className="bg-[#F5F5F5] p-2.5 rounded-md mx-2 w-56 focus:outline-none"/>
            </div>
            <div>
                <textarea name="query" value={message.query} onChange={handleChange}  placeholder="Your Message" className="bg-[#F5F5F5] p-2.5 rounded-md w-[46vw] h-56 mx-2 my-8 focus:outline-none" ></textarea>
            </div>
            <Button title="Send Message" rounded="rounded-md" width="w-44" padding="p-4" otherStyle="relative left-[35vw]" />
        </form>
      </div>

      <Footer />
    </>
  );
}

export default ContactPage;
