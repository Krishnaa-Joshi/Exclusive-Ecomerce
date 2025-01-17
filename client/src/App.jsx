// Hooks
import { Route, Routes } from "react-router-dom";

// Component
import HomePage from "./pages/Home/home";
import AboutPage from "./pages/About/about";
import ContactPage from "./pages/Contact/contact";
import CartPage from "./pages/Cart/cart";
import WishListPage from "./pages/wishList/wishListPage";
import UserAccoutPage from "./pages/Account/account";
import NotFoundPage from "./pages/Not Found/404";
import AuthPage from "./pages/Auth Page/AuthPage";
import CheckOutPage from "./pages/checkOut/checkOutPage";
import ProductDetailsPage from "./pages/Product details page/productDetailPage";
import OrderPlaced from "./pages/Order Place/orderPlaced";
import CategoryPage from "./pages/Category Page/categoryPage";
import ProtectedRoute from "./component/Protected Routes/protectedRoutes";
import FAQPage from "./pages/FAQs/FaqPage";

function App() {
  return (
    <>
      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* Home */}
        <Route path="/about" element={<AboutPage />} /> {/* About */}
        <Route path="/contact" element={<ContactPage />} /> {/* Contact */}
        <Route path="/login" element={<AuthPage isLogin={true} />} /> {/* Login */}
        <Route path="/signUp" element={<AuthPage />} /> {/* SignUp */}
        <Route path="/category" element={<CategoryPage />} /> {/* Category */}
        <Route path="/product/:id" element={<ProductDetailsPage />} /> {/* Product Details */}
        <Route path="*" element={<NotFoundPage />} /> {/* 404  */}
        <Route path="FAQs" element={<FAQPage />} /> {/* FAQs */}
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        /> {/* Cart */}
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <WishListPage />
            </ProtectedRoute>
          }
        /> {/* Wishlist */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <UserAccoutPage />
            </ProtectedRoute>
          }
        /> {/* Account */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckOutPage />
            </ProtectedRoute>
          }
        /> {/* Checkout */}
        <Route
          path="/orderPlaced"
          element={
            <ProtectedRoute>
              <OrderPlaced />
            </ProtectedRoute>
          }
        /> {/* order Placed */}
      </Routes>
    </>
  );
}

export default App;
