import { Context } from "@/context";
import { useContext } from "react";

function BillingDetails() {
    const { profileData } = useContext(Context);

    const fullName = profileData?.name || ""; 
    const [firstName = "", lastName = ""] = fullName
        ? fullName.split(" ")
        : ["", ""];

    console.log(profileData);

  return (
    <div className="ml-24">
      <div className="flex flex-col my-2.5">
        <p>First Name</p>
        <p className="bg-[#F5F5F5]  p-2.5 rounded-md w-96 my-2.5">
          {firstName || "Not set"}
        </p>
      </div>
      <div className="flex flex-col my-2.5">
        <p>Last Name</p>
        <p className="bg-[#F5F5F5] p-2.5 rounded-md w-96 my-2.5">
          {lastName || "Not set"}
        </p>
      </div>
      <div className="flex flex-col my-2.5">
        <p>Street Address</p>
        <p className="bg-[#F5F5F5] p-2.5 rounded-md w-96 my-2.5">
          {profileData?.address?.street || "Not set"}
        </p>
      </div>
      <div className="flex flex-col my-2.5">
        <p>{`Apartment, Floor etc (optional)`}</p>
        <p className="bg-[#F5F5F5] p-2.5 rounded-md w-96 my-2.5">not set</p>
      </div>
      <div className="flex flex-col my-2.5">
        <p>Town/City</p>
        <p className="bg-[#F5F5F5] p-2.5 rounded-md w-96 my-2.5">
          {profileData?.address?.city || "not set"}
        </p>
      </div>
      <div className="flex flex-col my-2.5">
        <p>Phone Number</p>
        <p className="bg-[#F5F5F5] p-2.5 rounded-md w-96 my-2.5">
          {profileData?.phone || "Not set"}
        </p>
      </div>
      <div className="flex flex-col my-2.5">
        <p>Email Address</p>
        <p className="bg-[#F5F5F5] p-2.5 rounded-md w-96 my-2.5">
          {profileData?.email || "Not set"}
        </p>
      </div>
    </div>
  );
}

export default BillingDetails;
