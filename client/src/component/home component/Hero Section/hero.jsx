import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center bg-black text-white h-auto p-2 text-xs sm:text-sm sm:flex-row sm:h-10 sm:p-0 lg:h-12 lg:text-base">
      <p className="text-center sm:text-left">
        End of Season Sale on All Furnitures And Free Express Delivery - OFF 50%!
        <span
          className="underline font-bold cursor-pointer inline-block sm:inline ml-1 "
          onClick={() => navigate("/")}
        >
          ShopNow
        </span>
      </p>
    </div>
  );
}

export default HeroSection;
