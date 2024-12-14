// Hooks
import { useNavigate } from "react-router-dom";

// SVGs
import Emptywishlist from "../../../assets/Account assets/wishlist/emptyWishlist.svg"

function WishList() {
  const Navigate = useNavigate();
  
  // navigate to Home Page
  const handleButton = ()=>{
    Navigate("/");
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <img src={Emptywishlist} alt="empty box" className="h-64" />
        <h1 className="text-3xl mb-2">Your wishList is empty!</h1>
        <p className="text-[#808080]">Explore more and shortList some items</p>
        <button className="bg-[#Db4444] text-white p-3 w-44 rounded-md my-4" onClick={handleButton}>
          Shop Now
        </button>
      </div>
    </>
  );
}

export default WishList;
