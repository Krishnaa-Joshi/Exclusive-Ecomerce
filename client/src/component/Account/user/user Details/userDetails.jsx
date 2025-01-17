// Hooks
import { Context } from "@/context";
import { useContext } from "react";

function UserDetails() {
  const { setAddAddress, profileData, section, setEditing } =
    useContext(Context);

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
    <div className="mt-8 mx-3 sm:w-[95vw] md:mx-0 md:mt-24 md:w-[540px] lg:w-[665px]">
      {/* Heading */}
      <h1
        className="text-[#DB4444] font-semibold text-xl my-4 cursor-pointer"
        onClick={section === "profile" ? editProfile : editAddress}
      >
        {section === "profile" ? "Edit Your Profile" : "My Address"}
      </h1>
      <div className="text-sm bg-[#F5F5F5] pl-3 sm:pl-0 sm:bg-white sm:text-base sm:w-[600px] sm:my-8 md:my-0 md:w-auto">
        <div className="sm:flex sm:justify-between">
          {/*First Name or Country */}
          <div className="flex items-center justify-between sm:items-start sm:flex-col ">
            <p className="font-semibold sm:font-normal">
              {section === "profile" ? "First Name" : "Country"}
            </p>
            <p className="text-[#999999] font-medium p-2.5 rounded-md w-[58vw] my-2.5 sm:font-normal sm:text-black sm:bg-[#F5F5F5] sm:w-72 md:w-64 lg:w-80">
              {section === "profile"
                ? firstName
                : profileData?.address?.country}
            </p>
          </div>

          {/*Last Name or State */}
          <div className="flex items-center justify-between sm:items-start sm:flex-col">
            <p className="font-semibold sm:font-normal">
              {section === "profile" ? "Last Name" : "State"}
            </p>
            <p className="text-[#999999] font-medium p-2.5 rounded-md w-[58vw] my-2.5 sm:font-normal sm:text-black sm:bg-[#F5F5F5] sm:w-72 md:w-64 lg:w-80">
              {section === "profile"
                ? lastName
                  ? lastName
                  : "Not Set"
                : profileData?.address?.state}
            </p>
          </div>
        </div>
        <div className="sm:flex sm:justify-between">
          {/*Email or City */}
          <div className="flex items-center justify-between sm:items-start sm:flex-col">
            <p className="font-semibold sm:font-normal">
              {section === "profile" ? "Email" : "City"}
            </p>
            <p className="text-[#999999] font-medium p-2.5 rounded-md w-[58vw] my-2.5 sm:font-normal sm:text-black sm:bg-[#F5F5F5] sm:w-72 md:w-64 lg:w-80">
              {section === "profile"
                ? profileData.email
                  ? profileData.email
                  : "Not Set"
                : profileData?.address?.city}
            </p>
          </div>

          {/*Phone No or Pin Code */}
          <div className="flex items-center justify-between sm:items-start sm:flex-col">
            <p className="font-semibold sm:font-normal">
              {section === "profile" ? "Phone No." : "Pin Code"}
            </p>
            <p className="text-[#999999] font-medium p-2.5 rounded-md w-[58vw] my-2.5 sm:font-normal sm:text-black sm:bg-[#F5F5F5] sm:w-72 md:w-64 lg:w-80">
              {section === "profile"
                ? profileData.phone
                  ? profileData.phone
                  : "Not Set"
                : profileData?.address?.zip}
            </p>
          </div>
        </div>

        {/*Password or Street */}
        <div className="flex items-center justify-between sm:items-start sm:flex-col">
          <p className="font-semibold sm:font-normal">
            {section === "profile" ? "Password" : "Street"}
          </p>
          <p className="text-[#999999] font-medium p-2.5 rounded-md w-[58vw] my-2.5 sm:font-normal sm:text-black sm:bg-[#F5F5F5] sm:w-full">
            {section === "profile" ? "********" : profileData.address.street}
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
