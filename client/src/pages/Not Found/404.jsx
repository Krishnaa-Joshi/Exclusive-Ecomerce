// Main component
import Footer from "@/component/common component/footer/footer";
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";

// Component
import EmptyState from "@/component/Account/Empty State/emptyState";

// SVGs
import Svg404 from "../../assets/404 page assests/404.svg";

function NotFoundPage() {
  return (
    <>
      <HeroSection />
      <NavBar />
      <div className=" flex justify-center items-center h-[50vh] md:h-screen xl:items-start">
        <EmptyState img={Svg404} heading="Page Not Found" subLine="Your visited page not found." button="Go to home"/>
      </div>
      <Footer />
    </>
  );
}

export default NotFoundPage;
