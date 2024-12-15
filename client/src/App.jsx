import { Route, Routes } from "react-router-dom";
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
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<AuthPage isLogin={true} />} />
        <Route path="/signUp" element={<AuthPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="FAQs" element={<FAQPage/>} />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <WishListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <UserAccoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckOutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orderPlaced"
          element={
            <ProtectedRoute>
              <OrderPlaced />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
