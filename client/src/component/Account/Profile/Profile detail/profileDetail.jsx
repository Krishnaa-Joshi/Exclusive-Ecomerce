import { Context } from "@/context";
import { useContext } from "react";

function ProfileDetail() {
  const { profileData } = useContext(Context);

  const fullName = profileData?.name || ""; // Ensure it's a string even if undefined or null
  const [firstName = "", lastName = ""] = fullName
    ? fullName.split(" ")
    : ["", ""];

  return (
    <>
      <div>
        <div className="flex justify-between ">
          <div className="flex flex-col ">
            <p>First Name</p>
            <p className="bg-[#F5F5F5] p-2.5 rounded-md w-80 my-2.5">
              {firstName || "Not set"}
            </p>
          </div>
          <div className="flex flex-col">
            <p>Last Name</p>
            <p className="bg-[#F5F5F5] p-2.5 rounded-md w-80 my-2.5">
              {lastName || "Not set"}
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p>Email</p>
            <p className="bg-[#F5F5F5] p-2.5 rounded-md w-80 my-2.5">
              {profileData.email || "Not set"}
            </p>
          </div>
          <div className="flex flex-col">
            <p>Phone No.</p>
            <p className="bg-[#F5F5F5] p-2.5 rounded-md w-80 my-2.5">
              {profileData.phone || "Not set"}
            </p>
          </div>
        </div>
        <div className="flex flex-col">
          <p>Password</p>
          <p className="bg-[#F5F5F5] p-2.5 rounded-md w-full my-2.5">
            ********
          </p>
        </div>
      </div>
    </>
  );
}

export default ProfileDetail;
