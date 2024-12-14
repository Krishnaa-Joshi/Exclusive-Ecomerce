import { Context } from "@/context";
import { useContext } from "react";

function AddressDetails() {
  const { setAddAddress, profileData } = useContext(Context);

  console.log(profileData);

  // handle Switch between Adreess component
  const handleClick = () => {
    setAddAddress(true);
  };

  return (
    <div className="mt-28 w-[45vw]">
      <h1
        className="text-[#DB4444] font-semibold text-xl my-4 cursor-pointer"
        onClick={handleClick}
      >
        My Address
      </h1>
      <div>
        <div className="flex justify-between ">
          <div className="flex flex-col ">
            <p>Country</p>
            <p className="bg-[#F5F5F5] p-2.5 rounded-md w-80  my-2.5">
              {profileData.address.country}
            </p>
          </div>
          <div className="flex flex-col">
            <p>State</p>
            <p className="bg-[#F5F5F5] p-2.5 rounded-md w-80  my-2.5">
              {profileData.address.state}
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p>City</p>
            <p className="bg-[#F5F5F5] p-2.5 rounded-md w-80 my-2.5">
              {profileData.address.city}
            </p>
          </div>
          <div className="flex flex-col">
            <p>Pin Code</p>
            <p className="bg-[#F5F5F5] p-2.5 rounded-md w-80  my-2.5">
              {profileData.address.zip}
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <p>Street</p>
          <p className="bg-[#F5F5F5] p-2.5 rounded-md w-full  my-2.5">
            {profileData.address.street}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddressDetails;
