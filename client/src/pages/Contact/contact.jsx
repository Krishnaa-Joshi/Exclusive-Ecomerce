// Main Component
import Footer from "@/component/common component/footer/footer";
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";
import Path from "@/component/common component/pages path/path";

// States
import { useState } from "react";

// Svgs
import Phone from "../../assets/Contact assets/phone.svg";
import Message from "../../assets/Contact assets/message.svg";
import ContactInfo from "@/component/Contact Component/ContactInfo";
import Button from "@/component/Button/Button";

function ContactPage() {
  const [message, setMessage] = useState({
    name: "",
    email: "",
    phoneNo: "",
    query: "",
  });

  //onChange
  const handleChange = (e) => {
    setMessage({
      ...message,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <HeroSection />
      <NavBar />
      {/* Path */}
      <Path />

      <div className="sm:h-screen sm:my-10 sm:focus:outline-none md:flex md:h-[70vh] lg:h-[60vh] md:justify-between xl:justify-evenly md:items-center">
        {/* Contact info */}
        <div className="h-80 flex flex-col justify-center mx-0 sm:mx-2 sm:justify-around sm:h-48 sm:items-center sm:flex-row md:relative md:bottom-[5vh] md:mx-4 md:block md:w-[30vw] md:h-auto lg:w-[26vw] lg:mx-4 xl:mx-0 xl:w-auto">
          <div className="flex flex-col justify-center mx-5 border-b-2 sm:border-b-white  border-b-[#808080] md:border-b-[#808080] h-[17vh] sm:h-auto sm:mx-0 md:relative md:bottom-[4vh] lg:h-[20vh]">
            <ContactInfo
              img={Phone}
              heading={"Call To Us"}
              service={"We are available 24/7,7 days a week."}
              contactDetail={"Phone: +8801661122"}
            />
          </div>
          <div className="mx-5 my-5 sm:mx-0 sm:my-0 md:border-none ">
            <ContactInfo
              img={Message}
              heading={"Write To Us"}
              service={
                "Fill out our form and we will contact you within 24 hours."
              }
              contactDetail={"Email: customer@exclusive.com"}
            />
          </div>
        </div>

        {/* Handle user Query */}
        <form action="" className="h-96 sm:h-[100vh] md:h-auto md:w-[55vw] lg:w-[66vw] xl:w-auto">
          <div className="flex justify-center mb-5 md:hidden">
            <p className="text-2xl font-semibold">Contact Us</p>
          </div>
          <div>
            <div className="flex sm:inline">
              <input
                type="text"
                name="name"
                value={message.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="bg-[#F5F5F5] p-1.5 rounded-sm mx-1.5 text-sm my-1 w-[47vw] sm:w-[30vw] sm:my-0 sm:text-base sm:p-2.5 sm:rounded-md sm:mx-2.5 md:mx-2 md:w-[25vw] lg:w-[20vw] xl:w-[19vw] focus:outline-none"
              />
              <input
                type="tel"
                name="phoneNo"
                value={message.phoneNo}
                onChange={handleChange}
                placeholder="Your PhoneNo."
                required
                className="bg-[#F5F5F5] p-1.5 rounded-sm mx-1.5 text-sm my-1 w-[46vw] sm:w-[30vw] sm:my-0 sm:text-base sm:p-2.5 sm:rounded-md sm:mx-2.5 md:mx-2 md:w-[25vw] lg:w-[20vw] xl:w-[19vw] focus:outline-none"
              />
            </div>
            <input
              type="email"
              name="email"
              value={message.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
              className="bg-[#F5F5F5] p-1.5 rounded-sm mx-1.5 text-sm my-1 w-[95vw] sm:w-[30vw] md:w-[52vw] sm:my-0 sm:text-base sm:p-2.5 sm:rounded-md sm:mx-2.5 md:mx-2 md:mt-2 lg:w-[20vw] xl:w-[19vw] focus:outline-none"
            />
          </div>
          <div>
            <textarea
              name="query"
              value={message.query}
              onChange={handleChange}
              placeholder="Your Message"
              className="bg-[#F5F5F5] w-[95vw] focus:outline-none mx-1.5 rounded-sm p-1.5 h-36 my-2  sm:w-[97vw] sm:p-2.5 sm:rounded-md sm:h-56 sm:mx-2 sm:my-8 md:my-5 md:w-[52vw] lg:w-[63vw] xl:w-[60vw]"
            ></textarea>
          </div>
          <div className="flex justify-center md:justify-end md:mr-6 xl:mr-2">
            <Button
              title="Send Message"
              rounded="rounded-md"
              width="w-32 sm:w-44"
              padding="p-2.5 sm:p-4"
              />
          </div>
        </form>
      </div>

      <Footer />
    </>
  );
}

export default ContactPage;
