// Main Component
import Footer from "@/component/common component/footer/footer";
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";
import Path from "@/component/common component/pages path/path";

// Hooks
import { Context } from "@/context";
import { useContext } from "react";

// Account Components
import { useNavigate } from "react-router-dom";
import UserDetails from "@/component/Account/user/user Details/userDetails";
import EditUserDetails from "@/component/Account/user/edit user Details/EditUserDetails";
import EmptyState from "@/component/Account/Empty State/emptyState";
import Message from "@/component/Message/message";

// SVGs
import EmptyOrder from "../../assets/Account assets/Order/emptyOrder.svg";
import EmptywishlistImg from "../../assets/Account assets/wishlist/emptyWishlist.svg";
import emptyAddress from "../../assets/Account assets/Address/AddressEmptyState.svg";

function UserAccoutPage() {
  const {
    profileData,
    editing,
    addAddress,
    section,
    setSection,
    wishlistProducts,
    error,
  } = useContext(Context);

  const quantity = wishlistProducts.length;
  const navigate = useNavigate();

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

      {/* Welcome Message */}
      <div className="flex relative left-24 mt-6">
        <p className="font-semibold">Welcome!</p>
        <p className="text-[#DB4444] ml-2 font-semibold">{profileData.name}</p>
      </div>

      {/* Error or Success Message */}
      {error ? (
        <Message/>
      ) : null}

      <div
        className={`flex w-[84vw] ${
          editing ? "h-[115vh]" : "h-[90vh]"
        } justify-between`}
      >
        <div className="flex flex-col w-[22vw] h-[50vh] items-center mt-16">
          {/* User Details  */}
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

          {/* My Orders */}
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

          {/* My Wishlist */}
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
        
        {/* Profile Section */}
        {section == "profile" ? (
          !editing ? (
            <UserDetails />
          ) : (
            <EditUserDetails />
          )
        ) : null}

        {/* Order Section */}
        {section == "order" ? (
          <EmptyState
            img={EmptyOrder}
            heading={"You haven't ordered anything yet."}
            subLine={"Long time you have't buy anything"}
          />
        ) : null}

        {/* WishList section */}
        {section == "wishList" ? (
          <>
            {quantity > 0 ? (
              navigate("/wishlist")
            ) : (
              <EmptyState
                img={EmptywishlistImg}
                heading={"Your wishList is empty!"}
                subLine={"Explore more and shortList some items"}
              />
            )}
          </>
        ) : null}

        {/* Address Section */}
        {section === "Address" ? (
          addAddress ? (
            <EditUserDetails />
          ) : isAddressEmpty() ? (
            <EmptyState
              img={emptyAddress}
              heading={"No Address yet"}
              subLine={"Please add your Address for your better experience"}
              button={"Add Address"}
            />
          ) : (
            <UserDetails />
          )
        ) : null}

      </div>
      <Footer />
    </>
  );
}

export default UserAccoutPage;
