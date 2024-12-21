// Hooks
import { Context } from "@/context";
import { useContext } from "react";

function UserDetails() {
  const { setAddAddress, profileData, section, setEditing, } = useContext(Context);

    const fullName = profileData?.name || ""; 
    const [firstName = "", lastName = ""] = fullName
      ? fullName.split(" ")
      : ["", ""];

    // handle Switch between Adreess component
    const editAddress = () => {
      setAddAddress(true);
    };

    // handle Switch between profile component
    const editProfile = () => {
        setEditing(true);
    };

  return (
    <div className="mt-24 w-[45vw]">
      {/* Heading */}
      <h1
        className="text-[#DB4444] font-semibold text-xl my-4 cursor-pointer"
        onClick={section === "profile"? editProfile : editAddress}
      >
        {section === "profile" ? "Edit Your Profile" : "My Address"}
      </h1>
      <div>
        <div className="flex justify-between ">

          {/*First Name or Country */}
          <div className="flex flex-col ">
            <p>{section === "profile" ? "First Name" : "Country"}</p>
            <p className="bg-[#F5F5F5] p-2.5 rounded-md w-80  my-2.5">
            {section === "profile" ? firstName : profileData?.address?.country}
            </p>
          </div>

          {/*Last Name or State */}
          <div className="flex flex-col">
            <p>{section === "profile" ? "Last Name" : "State"}</p>
            <p className="bg-[#F5F5F5] p-2.5 rounded-md w-80  my-2.5">
            {section === "profile" ? lastName ? lastName : "Not Set" : profileData?.address?.state}
            </p>
          </div>
        </div>
        <div className="flex justify-between">

          {/*Email or City */}
          <div className="flex flex-col">
            <p>{section === "profile" ? "Email" : "City"}</p>
            <p className="bg-[#F5F5F5] p-2.5 rounded-md w-80 my-2.5">
            {section === "profile" ? profileData.email ? profileData.email : "Not Set" : profileData?.address?.city}
            </p>
          </div>

          {/*Phone No or Pin Code */}
          <div className="flex flex-col">
            <p>{section === "profile" ? "Phone No." : "Pin Code"}</p>
            <p className="bg-[#F5F5F5] p-2.5 rounded-md w-80  my-2.5">
            {section === "profile" ? profileData.phone ? profileData.phone : "Not Set" : profileData?.address?.zip}
            </p>
          </div>
        </div>

        {/*Password or Street */}
        <div className="flex flex-col">
          <p>{section === "profile" ? "Password" : "Street"}</p>
          <p className="bg-[#F5F5F5] p-2.5 rounded-md w-full  my-2.5">
          {section === "profile" ? "********" : profileData.address.street}
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default UserDetails;
