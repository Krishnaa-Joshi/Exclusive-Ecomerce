import Footer from "@/component/common component/footer/footer";
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/home");
  };

  return (
    <>
      <HeroSection />
      <NavBar />
      <div className="">
        <div className="flex h-24 items-end relative left-24 w-64">
          <p className="text-[#909090] mr-2.5">Home</p>
          <p className="text-[#909090] mr-2.5">/</p>
          <p className="font-medium">404 Error</p>
        </div>

        <div className="h-[500px] flex justify-center items-center flex-col">
          <h1 className="text-9xl font-bold mb-6">404 Not Found</h1>
          <p className="text-2xl mb-24">
            Your visited page not found. You may go to home page
          </p>
          <button
            onClick={handleBackToHome}
            className="w-52 p-5 rounded-lg bg-[#DB4444] text-[#F6E3E3]"
          >
            Back to home page
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NotFoundPage;
