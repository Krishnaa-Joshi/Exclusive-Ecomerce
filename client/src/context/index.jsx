// library and hook
import { createContext, useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types"; // Import prop-types for validation
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { isAuthenticated } from "../context/Auth/auth.js";
import { useNavigate } from "react-router-dom";

export const Context = createContext(null);

function ContextProvider({ children }) {
  const navigate = useNavigate();

  // Handle Store items
  const [profileData, setProfileData] = useState({}); // user Details
  const [products, setProducts] = useState([]); // products
  const [wishlistProducts, setWhishlistProducts] = useState([]); // wishlist product
  const [cartProducts, setCartProducts] = useState([]); // cart products
  const [categoryProducts, setCategoryProducts] = useState([]); // Category Products
  const [orderedDetails, setOrderedDetails] = useState([]); //ordered Products

  // Handle Switch
  const [isLogin, setIsLogin] = useState(false); // signup and login component
  const [currentPage, setCurrentPage] = useState(""); // different pages
  const [editing, setEditing] = useState(false); // account page component
  const [addAddress, setAddAddress] = useState(false); // address  component
  const [section, setSection] = useState("profile"); // section of Account Page
  const [hamburger, sethamburger] = useState(false); // hamburger component

  // Handle Message state
  const [error, setError] = useState(""); // store Error
  const [errorType, setErrorType] = useState(true); //message Success or fail
  // Handle Authentication
  const [isAuth, setIsAuth] = useState(isAuthenticated()); // login or not
  const [couponValid, setCouponValid] = useState(true); //Coupon Validation

  const [editCart, setEditCart] = useState(false); // Edit CartPage Data
  const [search, setSearch] = useState(() => {
    return localStorage.getItem("search") || "";
  }); // search result
  const [sliceCount, setSliceCount] = useState([5, 10]); //manage sliceCount

  // Memoize randomized products
  useEffect(() => {
    const updateSliceCount = () => {
      if (window.innerWidth < 768) {
        setSliceCount([6, 12]); // Below sm
      } else if (window.innerWidth < 1024) {
        setSliceCount([8, 12]); // sm
      } else if (window.innerWidth < 1280) {
        setSliceCount([4, 12]); // sm
      } else {
        setSliceCount([5, 10]); // md and above
      }
    };
    updateSliceCount(); // Set initial value
    window.addEventListener("resize", updateSliceCount);

    return () => window.removeEventListener("resize", updateSliceCount);
  }, []);

  const shuffledProducts = useMemo(() => {
    return [...products]
      .sort(() => Math.random() - 0.5)
      .slice(0, sliceCount[0]);
  }, [products, sliceCount]);

  // Check authentication status on app load
  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

  // Check if Token Expire or Not
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const { exp } = jwtDecode(token); // Decode the token to get the expiration time
        const currentTime = Date.now() / 1000;

        if (exp < currentTime) {
          // Token has expired
          console.log("Token expired. Removing it from local storage.");
          localStorage.removeItem("token");
          // Redirect to login page
          navigate("/signUp");
          window.location.reload();
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token"); // Remove invalid token
      }
    }
  }, [navigate]);

  // Fetch profile Data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // extract token
        const token = localStorage.getItem("token");

        // not sign up or login in
        if (!token) {
          setError("You are not logged in");
          return;
        }

        // request server
        const response = await axios.get("http://localhost:5000/account", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // insert server response to Profile Data
        setProfileData(response.data);
      } catch (err) {
        console.error("Error fetching profile:", err.response || err);
      }
    };
    fetchProfile();
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        const data = response.data;
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  // fetch Product by category
  const fetchProductsByCategory = async (category) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );
      const data = response.data;
      console.log("category array: ", data.products);
      if (category === "fragrances") setSearch("perfumes");
      else if (category === "beauty") setSearch("Cosmetics");
      else setSearch(category);
      setCategoryProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  // Load search word
  useEffect(() => {
    localStorage.setItem("search", search);
  }, [search]);

  // Load products
  useEffect(() => {
    // Load wishlist
    const storedWishlist =
      JSON.parse(localStorage.getItem("wishlistProducts")) || [];
    console.log("Loaded wishlist from localStorage:", storedWishlist);
    setWhishlistProducts(storedWishlist);

    // Load cart with quantity
    const storedCart = JSON.parse(localStorage.getItem("cartProducts")) || [];
    console.log("Loaded cart from localStorage:", storedCart);
    setCartProducts(storedCart);

    // Load category
    const storedCategory =
      JSON.parse(localStorage.getItem("categoryProducts")) || [];
    console.log("loaded category From localStorage", storedCategory);
    setCategoryProducts(storedCategory);

    // Load order Details
    const storedOrderDetails =
      JSON.parse(localStorage.getItem("orderDetails")) || [];
    console.log("Loaded orderDetails from localStorage", storedOrderDetails);
    setOrderedDetails(storedOrderDetails);
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    console.log("Saving wishlist to localStorage:", wishlistProducts);
    localStorage.setItem("wishlistProducts", JSON.stringify(wishlistProducts));
  }, [wishlistProducts]);

  // Save order Details to localStorage whenever it changes
  useEffect(() => {
    console.log("Saving order Details to localStorage:", orderedDetails);
    localStorage.setItem("orderDetails", JSON.stringify(orderedDetails));
  }, [orderedDetails]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    console.log("Saving cart to localStorage:", cartProducts);
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }, [cartProducts]);

  // save CategoryProduct to LocalStorage
  useEffect(() => {
    console.log("Saving category Product to localStorage:", categoryProducts);
    localStorage.setItem("categoryProducts", JSON.stringify(categoryProducts));
  }, [categoryProducts]);

  // handle Quantity increment
  const handleIncrement = (id) => {
    console.log(`Incrementing quantity for product ID: ${id}`);
    setCartProducts((prev) => {
      const updatedCart = prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      );
      const updatedItem = updatedCart.find((item) => item.id === id);
      console.log(
        `Updated Quantity for product ID ${id}:`,
        updatedItem.quantity
      );
      return updatedCart;
    });
  };

  // handle Quantity decrement
  const handleDecrement = (id) => {
    console.log(`Decrementing quantity for product ID: ${id}`);
    setCartProducts((prev) => {
      const updatedCart = prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0); // Remove product if quantity becomes 0

      const updatedItem = updatedCart.find((item) => item.id === id);
      if (updatedItem) {
        console.log(
          `Updated Quantity for product ID ${id}:`,
          updatedItem.quantity
        );
      } else {
        console.log(`Product ID ${id} removed from cart as quantity reached 0`);
      }

      return updatedCart;
    });
  };

  // handle Search
  const handleSearch = async () => {
    // if search is empty
    if (search.trim() === "") {
      setErrorType(false);
      setError("Please enter a search term");
      setCategoryProducts([]);
      setTimeout(() => {
        setError("");
      }, 3000);
      return;
    }

    setError(""); // Clear any previous error message
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${search}`
      );
      const data = await response.json();
      setCategoryProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Something went wrong. Please try again later.");
    }

    navigate("/category");
  };

  // OrderNo Generator
  const orderNoGenrator = () => {
    const characters = "0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  };

  // Calculate Total Price
  const totalPrice = (products) => {
    return products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    );
  };

  // Calculate Total Price
  const total = totalPrice(cartProducts);

  // check if Address object of ProfileData is empty or Not
  function isAddressEmpty() {
    return Object.values(profileData.address).every(
      (value) => !value || value.trim() === ""
    );
  }

  // Handle place Order
  const handlePlaceOrder = () => {
    if (isAddressEmpty()) {
      setErrorType(false);
      setError("Address is Missing");
      setSection("Address");
      navigate("/account");
    } else {
      // Get current date
      const currentDate = new Date();
      const orderedDate = currentDate.toLocaleDateString();

      // Calculate delivery date (2 days later)
      const deliveryDateObj = new Date(currentDate);
      deliveryDateObj.setDate(currentDate.getDate() + 2);
      const deliveryDate = deliveryDateObj.toLocaleDateString();

      // Create the new order object
      const newOrder = {
        orderNo: orderNoGenrator(),
        totalPrice: total.toFixed(2),
        products: cartProducts,
        date: orderedDate,
        status: "IT'S ORDERED!",
        deliveryDate,
        viewOrder: false,
      };

      // Update the orderedDetails state
      setOrderedDetails((prevDetails) => [...prevDetails, newOrder]);
      setCartProducts([]);
      navigate("/orderPlaced");
    }
  };

  return (
    <Context.Provider
      value={{
        isLogin,
        setIsLogin,
        products,
        setProducts,
        currentPage,
        setCurrentPage,
        isAuth,
        setIsAuth,
        profileData,
        setProfileData,
        editing,
        setEditing,
        addAddress,
        setAddAddress,
        section,
        setSection,
        wishlistProducts,
        setWhishlistProducts,
        cartProducts,
        setCartProducts,
        handleIncrement,
        handleDecrement,
        editCart,
        setEditCart,
        categoryProducts,
        setCategoryProducts,
        fetchProductsByCategory,
        search,
        setSearch,
        error,
        setError,
        errorType,
        setErrorType,
        couponValid,
        setCouponValid,
        handleSearch,
        orderedDetails,
        setOrderedDetails,
        orderNoGenrator,
        totalPrice,
        hamburger,
        sethamburger,
        shuffledProducts,
        sliceCount,
        handlePlaceOrder,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default ContextProvider;

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children are React nodes and required
};
