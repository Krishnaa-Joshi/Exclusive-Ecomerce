import { useNavigate } from "react-router-dom";

// sale Heading
function HeroSection(){
    const navigate = useNavigate();

    return(
        <div className="bg-black text-white flex justify-center p-3">
            <p>End of Season Sale on All Furnitures And Free Express Delivery - OFF 50%! <span className="underline font-bold cursor-pointer" onClick={()=>navigate("/")}>ShopNow</span> </p>
        </div>
    )
}

export default HeroSection;