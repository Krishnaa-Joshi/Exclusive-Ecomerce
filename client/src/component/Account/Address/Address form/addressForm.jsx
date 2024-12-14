import { useState } from "react";
import { Context } from "@/context";
import { useContext } from "react";
import axios from "axios";

function AddressForm() {
  // Store From Data
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const { setAddAddress } = useContext(Context);

  // onChange Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  // handle Cancel Button
  const handleCancle = () => {
    setAddAddress(false);
  };

  // handle Submit Button
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Address Submitted:", address);
    try {
      const token = localStorage.getItem("token");
      
      // if Token is not provided
      if (!token) {
        alert("User not authenticated");
        return;
      }

      //  send Update request to server
      const response = await axios.put(
        "http://localhost:5000/update-address",
        address,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Server response", response.data);
      alert("address updated successfully");
      setAddAddress(false);
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <>
      <div className="mt-28 w-[45vw]">
        <h1 className="text-[#DB4444] font-semibold text-xl my-4 cursor-pointer">
          Enter Your Address
        </h1>
        <form action="">
          <div className="flex justify-between ">
            <div className="flex flex-col ">
              <label htmlFor="First Name">Country</label>
              <input
                type="text"
                name="country"
                value={address.country}
                onChange={handleChange}
                className="bg-[#F5F5F5] p-2.5 rounded-md w-80 focus:outline-none my-2.5"
                placeholder="Country"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Last Name">State</label>
              <input
                type="text"
                name="state"
                value={address.state}
                onChange={handleChange}
                className="bg-[#F5F5F5] p-2.5 rounded-md w-80 focus:outline-none my-2.5"
                placeholder="State"
                required
              />
            </div>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <label htmlFor="Email">City</label>
              <input
                type="text"
                name="city"
                value={address.city}
                onChange={handleChange}
                className="bg-[#F5F5F5] p-2.5 rounded-md w-80 focus:outline-none my-2.5"
                placeholder="City"
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="Phone">Pin Code</label>
              <input
                type="text"
                name="zip"
                value={address.zip}
                onChange={handleChange}
                className="bg-[#F5F5F5] p-2.5 rounded-md w-80 focus:outline-none my-2.5"
                placeholder="ZIP Code"
                required
              />
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="Street">Street</label>
            <input
              type="text"
              name="street"
              value={address.street}
              onChange={handleChange}
              className="bg-[#F5F5F5] p-2.5 rounded-md w-full focus:outline-none my-2.5"
              placeholder="Street Address"
              required
            />
          </div>
          <div className={"flex justify-end "}>
            <input
              type="button"
              className="cursor-pointer"
              value="Cancel"
              onClick={handleCancle}
            />
            <input
              type="submit"
              value="Save Changes"
              className="bg-[#db4444] text-white text-md w-52 p-4 rounded-md ml-8 my-5 cursor-pointer"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default AddressForm;
