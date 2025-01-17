// Main Component
import Footer from "@/component/common component/footer/footer";
import HeroSection from "@/component/home component/Hero Section/hero";
import NavBar from "@/component/common component/Navbar/navbar";
import Path from "@/component/common component/pages path/path";

// Hooks
import { Context } from "@/context";
import { Children, useContext } from "react";

// Account Components
import { useNavigate } from "react-router-dom";
import UserDetails from "@/component/Account/user/user Details/userDetails";
import EditUserDetails from "@/component/Account/user/edit user Details/EditUserDetails";
import EmptyState from "@/component/Account/Empty State/emptyState";
import Message from "@/component/Message/message";
import OrderCard from "@/component/order Component/Order Card/orderCard";

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
    orderedDetails,
    setOrderedDetails,
    error,
  } = useContext(Context);

  const quantity = wishlistProducts.length;
  const navigate = useNavigate();

  // Handle switch between different sections of the account page
  const handleSection = (section) => {
    setSection(section);
  };

  // Check if the Address object of ProfileData is empty or not
  function isAddressEmpty() {
    return Object.values(profileData.address).every(
      (value) => !value || value.trim() === ""
    );
  }

  // Redirect to Wishlist if it has items
  if (section === "wishList" && quantity > 0) {
    navigate("/wishlist");
  }

  // handle Cancel Order Button
  const handleCancel = (index) => {
    setOrderedDetails((prevDetails) =>
      prevDetails.map((order, i) =>
        i === index ? { ...order, status: "ORDER UNSUCCESSFUL" } : order
      )
    );
  };

  // view Order Button Logic
  const handleViewOrder = (index) => {
    setOrderedDetails((prevDetails) =>
      prevDetails.map((order, i) =>
        i === index ? { ...order, viewOrder: true } : order
      )
    );
  };

  // Close order Button Logic
  const handleCloseOrder = (index) => {
    setOrderedDetails((prevDetails) =>
      prevDetails.map((order, i) =>
        i === index ? { ...order, viewOrder: false } : order
      )
    );
  };

  return (
    <>
      <HeroSection />
      <NavBar />
      <Path />

      {/* Welcome Message */}
      <div className="flex flex-col justify-center items-center mt-10 sm:flex-row sm:items-start md:justify-start md:relative md:left-24 md:mt-6">
        <p className="font-semibold text-sm sm:text-base">Welcome!&nbsp;</p>
        <p className="text-[#DB4444] font-semibold text-lg sm:text-base sm:ml-2">
          {profileData.name}
        </p>
      </div>

      {/* Error or Success Message */}
      {error ? <Message /> : null}

      <div
        className={`justify-between mb-20 md:flex md:w-[750px] lg:w-[1000px] xl:w-[1080px] 2xl:w-[1200px] ${
          editing ? "md:h-[115vh]" : " md:h-[90vh]"
        }`}
      >
        <div className="mt-16 md:flex md:flex-col md:w-[22vw] md:h-[50vh] md:items-center">
          {/* User Details */}
          <div
            className={`${
              ["profile", "Address"].includes(section)
                ? "block"
                : "hidden md:block"
            }`}
          >
            <h1 className="font-semibold mx-3 mb-3 md:mx-0 ">
              Manage My Account
            </h1>
            <div className="flex justify-center w-full mt-5 md:w-auto md:block">
              <p
                className={`mr-5 mt-1 cursor-pointer md:relative md:left-8 ${
                  section == "profile" ? "text-[#DB4444]" : "text-[#808080]"
                }`}
                onClick={() => handleSection("profile")}
              >
                My Profile
              </p>
              <p
                className={`mt-1 mb-3 cursor-pointer md:relative md:left-8 ${
                  section == "Address" ? "text-[#DB4444]" : "text-[#808080]"
                }`}
                onClick={() => handleSection("Address")}
              >
                My Address
              </p>
            </div>
          </div>

          {/* My Orders */}
          <div
            className={`mt-2 ${
              section === "order" ? "block" : "hidden"
            } md:block md:relative md:right-9`}
          >
            <h1 className="font-semibold mx-3 md:mx-0 mb-3 text-xl md:text-base">
              My Orders
            </h1>
            <p
              className={`hidden left-10 md:relative md:mt-1 md:mb-3 md:cursor-pointer md:block lg:left-8 ${
                section == "order" ? "text-[#DB4444]" : "text-[#808080]"
              }`}
              onClick={() => handleSection("order")}
            >
              My Orders
            </p>
          </div>

          {/* My Wishlist */}
          <div className="hidden md:block md:relative md:right-8 md:mt-2">
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
        {section === "profile" ? (
          !editing ? (
            <UserDetails />
          ) : (
            <EditUserDetails />
          )
        ) : null}

        {/* Order Section */}
        {section === "order" ? (
          orderedDetails?.length === 0 ? (
            <div className="flex justify-center items-center md:block">
              <EmptyState
                img={EmptyOrder}
                heading={"You haven't ordered anything yet."}
                subLine={"Long time you haven't bought anything"}
              />
            </div>
          ) : (
            <div
              className="flex flex-col items-center overflow-y-auto max-h-screen mt-4 md:mt-8 md:w-[68vw] md:overflow-x-hidden lg:mt-0 lg:relative lg:top-8 xl:bottom-14"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {Children.toArray(
                orderedDetails.every((order) => !order.viewOrder)
                  ? // Render all orders if all viewOrder values are false
                    orderedDetails.map((order, index) => (
                      <OrderCard
                        order={order}
                        index={index}
                        handleCancel={handleCancel}
                        handleViewOrder={handleViewOrder}
                        handleCloseOrder={handleCloseOrder}
                      />
                    ))
                  : // Render only orders with viewOrder set to true
                    orderedDetails
                      .map((order, index) => ({
                        ...order,
                        originalIndex: index,
                      })) // Attach original index
                      .filter((order) => order.viewOrder)
                      .map((order) => (
                        <OrderCard
                          order={order}
                          index={order.originalIndex}
                          handleCancel={handleCancel}
                          handleViewOrder={handleViewOrder}
                          handleCloseOrder={handleCloseOrder}
                        />
                      ))
              )}
            </div>
          )
        ) : null}

        {/* WishList Section */}
        {section === "wishList" && quantity === 0 ? (
          <div className="md:flex md:items-center md:justify-start md:w-[70vw] lg:w-auto xl:block">
            <EmptyState
              img={EmptywishlistImg}
              heading={"Your wishlist is empty!"}
              subLine={"Explore more and shortlist some items"}
            />
          </div>
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
