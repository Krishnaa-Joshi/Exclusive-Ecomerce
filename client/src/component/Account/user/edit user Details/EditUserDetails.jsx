// Hooks
import { useState, useContext } from "react";
import { Context } from "@/context";
import axios from "axios";

function EditUserDetails() {
  const {
    profileData,
    setEditing,
    setAddAddress,
    section,
    setError,
    setErrorType,
  } = useContext(Context);
  const fullName = profileData?.name || "";
  const [firstName, lastName] = fullName ? fullName.split(" ") : ["", ""];

  // Store From Data
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  // store form Data
  const [formData, setFormData] = useState({
    firstName: firstName || "",
    lastName: lastName || "",
    email: profileData?.email || "",
    phone: profileData?.phone || "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  // onChange Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (section === "profile")
      setFormData((prev) => ({ ...prev, [name]: value }));
    else setAddress((prev) => ({ ...prev, [name]: value }));
  };

  // Cancel Button
  const handleCancle = () => {
    if (section === "profile") setEditing(false);
    else setAddAddress(false);
  };

  // Submit Button
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      // if Token is not provided
      if (!token) {
        alert("User not authenticated");
        return;
      }

      //  send Update request to server
      const response = await axios.put(
        section === "profile"
          ? "http://localhost:5000/update-profile"
          : "http://localhost:5000/update-address",
        section === "profile" ? formData : address,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Server response", response.data);
      // success Message
      if (section === "profile") {
        setErrorType(true);
        setError("Profile updated successfully");
        setEditing(false);
      } else {
        setErrorType(true);
        setError("Address updated successfully");
        setAddAddress(false);
      }
    } catch (error) {
      setErrorType(false);
      // Error Message
      if (section === "profile")
        setError("Failed to update profile. Please try again.");
      else setError("Failed to update Address. Please try again.");

      console.error("Error updating profile: ", error);
    }

    setTimeout(() => {
      setError("");
    }, 2000);
  };

  return (
    <>
      <div className="mt-8 mx-3 sm:w-[95vw] md:mx-0 md:mt-24 md:w-[540px] lg:w-[665px]">
        {/* Heading */}
        <h1 className="text-[#DB4444] font-semibold text-xl my-4">
          {section === "profile" ? "Edit your Profile" : "Enter Your Address"}
        </h1>
        <form action="post" className="sm:w-[600px] md:w-auto">
          <div className="text-sm sm:text-base sm:flex sm:justify-between ">
            {/*First Name or Country */}
            <div className="flex flex-col ">
              <label htmlFor={section === "profile" ? "First Name" : "Country"}>
                {section === "profile" ? "First Name" : "Country"}
              </label>
              <input
                type="text"
                name={section === "profile" ? "firstName" : "country"}
                value={
                  section === "profile" ? formData.firstName : address.country
                }
                onChange={handleChange}
                className="bg-[#F5F5F5] p-2.5 focus:outline-none my-2.5 rounded-md sm:w-72 md:w-64 lg:w-80"
                placeholder={section === "profile" ? "First Name" : "Country"}
                {...(section === "profile" ? "" : { required: true })}
              />
            </div>

            {/*lastName or State */}
            <div className="flex flex-col">
              <label htmlFor={section === "profile" ? "Last Name" : "State"}>
                {section === "profile" ? "Last Name" : "State"}
              </label>
              <input
                type="text"
                name={section === "profile" ? "lastName" : "state"}
                value={
                  section === "profile" ? formData.lastName : address.state
                }
                onChange={handleChange}
                className="bg-[#F5F5F5] p-2.5 rounded-md focus:outline-none my-2.5 sm:w-72 md:w-64 lg:w-80"
                placeholder={section === "profile" ? "Last Name" : "State"}
                {...(section === "profile" ? "" : { required: true })}
              />
            </div>
          </div>
          <div className="sm:flex sm:justify-between">
            {/*Email or City */}
            <div className="flex flex-col">
              <label htmlFor={section === "profile" ? "Email" : "City"}>
                {section === "profile" ? "Email" : "City"}
              </label>
              <input
                type="text"
                name={section === "profile" ? "email" : "city"}
                value={section === "profile" ? formData.email : address.city}
                onChange={handleChange}
                className="bg-[#F5F5F5] p-2.5 rounded-md focus:outline-none my-2.5 sm:w-72 md:w-64 lg:w-80"
                placeholder={section === "profile" ? "Email" : "City"}
                {...(section === "profile"
                  ? { readOnly: true }
                  : { required: true })}
              />
            </div>

            {/*PhoneNo or Pin Code */}
            <div className="flex flex-col">
              <label htmlFor={section === "profile" ? "Phone No." : "Pin code"}>
                {section === "profile" ? "Phone No." : "Pin Code"}
              </label>
              <input
                type={section === "profile" ? "tel" : "text"}
                name={section === "profile" ? "phone" : "zip"}
                value={section === "profile" ? formData.phone : address.zip}
                onChange={handleChange}
                className="bg-[#F5F5F5] p-2.5 rounded-md focus:outline-none my-2.5 sm:w-72 md:w-64 lg:w-80"
                placeholder={section === "profile" ? "Phone No." : "Pin code"}
                {...(section === "profile" ? "" : { required: true })}
              />
            </div>
          </div>

          {/*Password or Street */}
          <div className="flex flex-col">
            <label htmlFor={section === "profile" ? "Password" : "Street"}>
              {section === "profile" ? "Password" : "Street"}
            </label>
            <input
              type={section === "profile" ? "password" : "text"}
              name={section === "profile" ? "password" : "street"}
              value={section === "profile" ? formData.password : address.street}
              onChange={handleChange}
              className="bg-[#F5F5F5] p-2.5 rounded-md focus:outline-none my-2.5 sm:w-full"
              placeholder={
                section === "profile" ? "Current password" : "Street Address"
              }
              {...(section === "profile" ? "" : { required: true })}
            />
            {section === "profile" ? (
              <>
                {/* newPassword */}
                <input
                  type="password"
                  name="newPassword"
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="bg-[#F5F5F5] p-2.5 rounded-md focus:outline-none my-2.5 sm:w-full"
                />
                {/* Confirm Password */}
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm New Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-[#F5F5F5] p-2.5 rounded-md focus:outline-none my-2.5 sm:w-full"
                />
              </>
            ) : null}
          </div>
          <div className={"flex sm:justify-end "}>
            {/* Cancel Button */}
            <input
              type="button"
              className="cursor-pointer"
              value="Cancel"
              onClick={handleCancle}
            />

            {/* Submit Button */}
            <input
              type="submit"
              value="Save Changes"
              className="bg-[#db4444] text-white text-md w-32 p-2.5 rounded-md ml-8 my-5 cursor-pointer sm:w-40 sm:p-3 md:w-52 md:p-4"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default EditUserDetails;
