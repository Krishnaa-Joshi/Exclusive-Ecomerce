// Hooks
import { Context } from "@/context";
import { useContext } from "react";

function BillingDetails() {
  const { profileData } = useContext(Context);

  const fullName = profileData?.name || "";
  const [firstName = "", lastName = ""] = fullName
    ? fullName.split(" ")
    : ["", ""];

  return (
    <div className="mx-2 bg-[#F5F5F5] pl-3 py-2 rounded-lg text-sm sm:text-base sm:pl-5 sm:py-0 sm:mx-5 md:mx-0 md:pl-0 md:rounded-none md:bg-white md:ml-12 lg:ml-14 xl:ml-24 xl:w-auto">
      {/* First Name */}
      <div className="flex flex-row items-center justify-between my-1 sm:my-2.5 md:justify-start md:items-start md:flex-col">
        <p className="font-medium md:font-normal">First Name</p>
        <p className="p-2.5 font-semibold text-[#808080] rounded-md w-[60vw] sm:my-2.5 sm:w-[35vw] md:w-72 md:bg-[#F5F5F5] md:text-black md:font-normal lg:w-96">
          {firstName || "Not set"}
        </p>
      </div>

      {/* Last Name */}
      <div className="flex flex-row items-center justify-between my-1 sm:my-2.5 md:justify-start md:items-start md:flex-col">
        <p className="font-medium md:font-normal">Last Name</p>
        <p className="p-2.5 font-semibold text-[#808080] rounded-md w-[60vw] sm:my-2.5 sm:w-[35vw] md:w-72 md:bg-[#F5F5F5] md:text-black md:font-normal lg:w-96">
          {lastName || "Not set"}
        </p>
      </div>

      {/* Address */}
      <div className="flex flex-row items-center justify-between my-1 sm:my-2.5 md:justify-start md:items-start md:flex-col">
        <p className="font-medium md:font-normal">Street Address</p>
        <p className="p-2.5 font-semibold text-[#808080] rounded-md w-[60vw] sm:w-[35vw] sm:my-2.5 md:w-72 md:bg-[#F5F5F5] md:text-black md:font-normal lg:w-96">
          {profileData?.address?.street || "Not set"}
        </p>
      </div>

      {/* City */}
      <div className="flex flex-row items-center justify-between my-1 sm:my-2.5 md:justify-start md:items-start md:flex-col">
        <p className="font-medium md:font-normal">Town/City</p>
        <p className="p-2.5 font-semibold text-[#808080] rounded-md w-[60vw] sm:w-[35vw] sm:my-2.5 md:w-72 md:bg-[#F5F5F5] md:text-black md:font-normal lg:w-96">
          {profileData?.address?.city || "not set"}
        </p>
      </div>

      {/* Phone No. */}
      <div className="flex flex-row items-center justify-between my-1 sm:my-2.5 md:justify-start md:items-start md:flex-col">
        <p className="font-medium md:font-normal">Phone No.</p>
        <p className="p-2.5 font-semibold text-[#808080] rounded-md w-[60vw] sm:w-[35vw] sm:my-2.5 md:w-72 md:bg-[#F5F5F5] md:text-black md:font-normal lg:w-96">
          {profileData?.phone || "Not set"}
        </p>
      </div>

      {/* Email */}
      <div className="flex flex-row items-center justify-between my-1 sm:my-2.5 md:justify-start md:items-start md:flex-col">
        <p className="font-medium md:font-normal">Email Address</p>
        <p className="p-2.5 font-semibold text-[#808080] rounded-md w-[60vw] sm:w-[35vw] sm:my-2.5 md:w-72 md:bg-[#F5F5F5] md:text-black md:font-normal lg:w-96">
          {profileData?.email || "Not set"}
        </p>
      </div>
    </div>
  );
}

export default BillingDetails;
