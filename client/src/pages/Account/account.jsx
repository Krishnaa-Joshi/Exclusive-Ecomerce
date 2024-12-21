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
      <div className="flex relative left-24 mt-6">
        <p className="font-semibold">Welcome!</p>
        <p className="text-[#DB4444] ml-2 font-semibold">{profileData.name}</p>
      </div>

      {/* Error or Success Message */}
      {error ? <Message /> : null}

      <div
        className={`flex w-[84vw] ${
          editing ? "h-[115vh]" : "h-[90vh]"
        } justify-between`}
      >
        <div className="flex flex-col w-[22vw] h-[50vh] items-center mt-16">
          {/* User Details */}
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
            <EmptyState
              img={EmptyOrder}
              heading={"You haven't ordered anything yet."}
              subLine={"Long time you haven't bought anything"}
            />
          ) : (
            <div
              className="flex flex-col items-center w-[61vw] overflow-y-auto max-h-screen relative bottom-14"
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
          <EmptyState
            img={EmptywishlistImg}
            heading={"Your wishlist is empty!"}
            subLine={"Explore more and shortlist some items"}
          />
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
