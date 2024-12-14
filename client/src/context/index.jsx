// library and hook
import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import prop-types for validation
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { isAuthenticated } from "../context/Auth/auth.js";

export const Context = createContext(null);

function ContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false); // handle switch between signup and login component
  const [isAuth, setIsAuth] = useState(isAuthenticated()); // check user is login or not
  const [products, setProducts] = useState([]); // store products
  const [currentPage, setCurrentPage] = useState(""); // handle switch between different pages
  const [error, setError] = useState(""); // store Error
  const [profileData, setProfileData] = useState({}); // store user Details
  const [editing, setEditing] = useState(false); //handle switch between account page component
  const [addAddress, setAddAddress] = useState(false); //handle switch between account page component
  const [section, setSection] = useState("profile"); //handle switch between account page component
  const [wishlistProducts, setWhishlistProducts] = useState([]); // Store wishlist product
  const [cartProducts, setCartProducts] = useState([]); // Store cart products
  const [editCart, setEditCart] = useState(false); // Edit CartPage Data
  const [categoryProducts, setCategoryProducts] = useState([]); // Store Category Products 
  const [search, setSearch] = useState(() => {
    return localStorage.getItem("search") || "";
  }); // search result

  useEffect(() => {
    const token = localStorage.getItem("jwtToken"); 

    if (token) {
      try {
        const { exp } = jwtDecode(token); // Decode the token to get the expiration time
        const currentTime = Date.now() / 1000;

        if (exp < currentTime) {
          // Token has expired
          console.log("Token expired. Removing it from local storage.");
          localStorage.removeItem("jwtToken");
          // Redirect to login page
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("jwtToken"); // Remove invalid token
      }
    }
  }, []);

  // Fetch profile Data from user
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
        setError(err.response?.data?.error || "An unexpected error occurred");
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

  // search 
  useEffect(() => {
    localStorage.setItem("search", search);
  }, [search]);

  // fetch Product by category
  const fetchProductsByCategory = async (category) => {
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );
      const data = response.data;
      console.log("category array: ",data.products);
      if(category === "fragrances")
        setSearch("perfumes");
      else if(category === "beauty")
        setSearch("Cosmetics");
      else
        setSearch(category);  
      setCategoryProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  useEffect(() => {
    // Load wishlist products
    const storedWishlist =
      JSON.parse(localStorage.getItem("wishlistProducts")) || [];
    console.log("Loaded wishlist from localStorage:", storedWishlist);
    setWhishlistProducts(storedWishlist);

    // Load cart products with quantity
    const storedCart = JSON.parse(localStorage.getItem("cartProducts")) || [];
    console.log("Loaded cart from localStorage:", storedCart);
    setCartProducts(storedCart);

    // Load category Product 
    const storedCategory = JSON.parse(localStorage.getItem("categoryProducts")) || [];
    console.log("loaded category From localStorage", storedCategory);
    setCategoryProducts(storedCategory);

  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    console.log("Saving wishlist to localStorage:", wishlistProducts);
    localStorage.setItem("wishlistProducts", JSON.stringify(wishlistProducts));
  }, [wishlistProducts]);

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

  // Check authentication status on app load
  useEffect(() => {
    setIsAuth(isAuthenticated());
  }, []);

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
        setError
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