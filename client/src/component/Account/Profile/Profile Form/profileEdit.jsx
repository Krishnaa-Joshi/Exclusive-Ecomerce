import { Context } from "@/context";
import { useContext, useState } from "react";
import axios from "axios";

function ProfileEditingForm() {
  const { profileData, setEditing } = useContext(Context);
  const fullName = profileData?.name || "";
  const [firstName, lastName] = fullName ? fullName.split(" ") : ["", ""];

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

  // handle Cancel Button
  const handleCancel = () => {
    setEditing(false);
  };

  // handle onCgange Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // handle Submit Button
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data: ", formData);

    try {
      const token = localStorage.getItem("token");

      // token is not provided
      if (!token) {
        alert("User not authenticated");
        return;
      }

      // update profile Request to server
      const response = await axios.put(
        "http://localhost:5000/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Server response", response.data);
      alert("Profile updated successfully");
      setEditing(false);
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <form>
      <div className="flex justify-between ">
        <div className="flex flex-col ">
          <label htmlFor="First Name">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder={firstName || "Not set"}
            value={formData.firstName}
            onChange={handleChange}
            className="bg-[#F5F5F5] p-2.5 rounded-md w-80 focus:outline-none my-2.5"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Last Name">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder={lastName || "Not set"}
            value={formData.lastName}
            onChange={handleChange}
            className="bg-[#F5F5F5] p-2.5 rounded-md w-80 focus:outline-none my-2.5"
          />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            name="email"
            placeholder={profileData.email || "Not set"}
            value={formData.email}
            onChange={handleChange}
            className="bg-[#F5F5F5] p-2.5 rounded-md w-80 focus:outline-none my-2.5"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Phone">Phone No.</label>
          <input
            type="tel"
            name="phone"
            placeholder={profileData.phone || "Not set"}
            value={formData.phone}
            onChange={handleChange}
            className="bg-[#F5F5F5] p-2.5 rounded-md w-80 focus:outline-none my-2.5"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Current password"
          value={formData.password}
          onChange={handleChange}
          className="bg-[#F5F5F5] p-2.5 rounded-md w-full focus:outline-none my-2.5"
        />
        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={formData.newPassword}
          onChange={handleChange}
          className="bg-[#F5F5F5] p-2.5 rounded-md w-full focus:outline-none my-2.5"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm New Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="bg-[#F5F5F5] p-2.5 rounded-md w-full focus:outline-none my-2.5"
        />
      </div>
      <div className="flex justify-end ">
        <input
          type="button"
          className="cursor-pointer"
          value="Cancel"
          onClick={handleCancel}
        />
        <input
          type="submit"
          value="Save Changes"
          className="bg-[#db4444] text-white text-md w-52 p-4 rounded-md ml-8 my-5 cursor-pointer"
          onClick={handleSubmit}
        />
      </div>
    </form>
  );
}

export default ProfileEditingForm;
