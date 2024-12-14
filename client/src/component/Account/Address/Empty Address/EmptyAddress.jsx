// Hooks
import { Context } from "@/context";
import { useContext } from "react";

// SVGs
import emptyAddress from "../../../../assets/Account assets/Address/AddressEmptyState.svg"

function EmptyAddress() {

  const { setAddAddress } = useContext(Context)

  // handle Add Address button
  const handleButton = () => {
    setAddAddress(true);
  }

  return (
    <>
      <div className="mt-16 w-[58vw]">
        <div className="flex justify-center items-center flex-col">
          <img src={emptyAddress} alt="empty box" className="h-64" />
          <h1 className="text-3xl mb-2">No Address yet</h1>
          <p className="text-[#808080]">
            Please add your Address for your better experience
          </p>
          <button className="bg-[#Db4444] text-white p-3 w-44 rounded-md my-4" onClick={handleButton}>
            Add Address
          </button>
        </div>
      </div>
    </>
  );
}

export default EmptyAddress;
