// Hooks
import { useNavigate } from "react-router-dom";

// SVGs
import EmptyOrder from "../../../assets/Account assets/Order/emptyOrder.svg"

function Orders() {
  const Navigate = useNavigate();

  // navigate to home Page
  const handleButton = ()=>{
    Navigate("/");
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col">
        <img src={EmptyOrder} alt="empty box" className="h-64" />
        <h1 className="text-3xl mb-2">You haven&apos;t ordered anything yet.</h1>
        <p className="text-[#808080]">Long time you have&apos;t buy anything</p>
        <button className="bg-[#Db4444] text-white p-3 w-44 rounded-md my-4" onClick={handleButton}>
          Shop Now
        </button>
      </div>
    </>
  );
}

export default Orders;
