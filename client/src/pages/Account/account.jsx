import Footer from "@/component/common component/footer/footer";
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";
import Path from "@/component/common component/pages path/path";
import { Context } from "@/context";
import { useContext } from "react";
import ProfileDetail from "@/component/Account/Profile/Profile detail/profileDetail";
import ProfileEditingForm from "@/component/Account/Profile/Profile Form/profileEdit";
import AddressForm from "@/component/Account/Address/Address form/addressForm";
import Orders from "@/component/Account/order/order";
import WishList from "@/component/Account/wishList/wishList";
import EmptyAddress from "@/component/Account/Address/Empty Address/EmptyAddress";
import AddressDetails from "@/component/Account/Address/Address Details/AddressDetails";

function UserAccoutPage() {
  const { profileData, editing, setEditing, addAddress, section, setSection } =
    useContext(Context);

  console.log(profileData);

  // handle switch between editProfile Component and DisplayProfileDetail component
  const editProfile = () => {
    setEditing(true);
  };

  // handle switch between different section of account Page
  const handleSection = (section) => {
    setSection(section);
  };

  // check if Address object of ProfileData is empty or Not
  function isAddressEmpty() {
    return Object.values(profileData.address).every(
      (value) => !value || value.trim() === ""
    );
  }

  return (
    <>
      <HeroSection />
      <NavBar />
      <Path />
      <div className="flex relative left-[85%]">
        <p className="font-semibold">Welcome!</p>
        <p className="text-[#DB4444] ml-2 font-semibold">{profileData.name}</p>
      </div>
      <div
        className={`flex w-[84vw] ${
          editing ? "h-[115vh]" : "h-[90vh]"
        } justify-between`}
      >
        <div className="flex flex-col w-[22vw] h-[50vh] items-center mt-20">
          <div>
            <h1 className="font-semibold mb-3">Manage My Account</h1>
            <p
              className={`relative left-8 mt-1 cursor-pointer ${
                section == "profile" ? "text-[#DB4444]" : "text-[#808080]"
              }`}
              onClick={() => handleSection("profile")}
            >
              My Profile
            </p>
            <p
              className={`relative left-8 mt-1 mb-3 cursor-pointer ${
                section == "Address" ? "text-[#DB4444]" : "text-[#808080]"
              }`}
              onClick={() => handleSection("Address")}
            >
              My Address
            </p>
          </div>
          <div className="relative right-9 mt-2">
            <h1 className="font-semibold mb-3">My Orders</h1>
            <p
              className={`relative left-8 mt-1 mb-3 cursor-pointer ${
                section == "order" ? "text-[#DB4444]" : "text-[#808080]"
              }`}
              onClick={() => handleSection("order")}
            >
              My Orders
            </p>
          </div>
          <div className="relative right-8 mt-2">
            <h1 className="font-semibold mb-3 ">My WishList</h1>
            <p
              className={`relative left-8 mt-1 mb-3 cursor-pointer ${
                section == "wishList" ? "text-[#DB4444]" : "text-[#808080]"
              }`}
              onClick={() => handleSection("wishList")}
            >
              My WishList
            </p>
          </div>
        </div>

        {section == "profile" ? (
          <div className="mt-28 w-[45vw]">
            <h1
              onClick={editProfile}
              className="text-[#DB4444] font-semibold text-xl my-4 cursor-pointer"
            >
              Edit Your Profile
            </h1>
            {!editing ? <ProfileDetail /> : <ProfileEditingForm />}
          </div>
        ) : null}
        {section == "order" ? (
          <div className="mt-16 w-[58vw]">
            <Orders />
          </div>
        ) : null}
        {section == "wishList" ? (
          <div className="mt-16 w-[58vw]">
            <WishList />
          </div>
        ) : null}

        {section === "Address" ? (
          addAddress ? (
            <AddressForm />
          ) : isAddressEmpty() ? (
            <EmptyAddress />
          ) : (
            <AddressDetails />
          )
        ) : null}
      </div>
      <Footer />
    </>
  );
}

export default UserAccoutPage;
