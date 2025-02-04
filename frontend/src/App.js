import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProductDetailPage from "./components/ProductDetailPage";
import AdminDashboard from "./pages/AdminDashBoard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.json";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import AdminPostProduct from "./pages/AdminPostProduct";
import AdminEditForm from "./pages/AdminEditForm";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import OrderList from "./components/OrderList";
import AdminOrderUpdate from "./components/AdminOrderUpdate";
import ErrorPage from "./components/ErrorPage";
import "./App.css";
const App = () => {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    {
      path: "/profile",
      element: (
        <>
          <NavBar />
          <Profile />
        </>
      ),
    },
    {
      path: "/product/:id",
      element: (
        <>
          <NavBar />
          <ProductDetailPage />
        </>
      ),
    },
    {
      path: "/admin/dashboard",
      element: (
        <>
          <NavBar />
          <AdminDashboard />
        </>
      ),
    },
    {
      path: "/admin/productEdit/:id",
      element: (
        <>
          <NavBar />
          <AdminEditForm />
        </>
      ),
    },
    {
      path: "/admin/productform",
      element: (
        <>
          <NavBar />
          <AdminPostProduct />
        </>
      ),
    },
    {
      path: "/cart",
      element: (
        <>
          <Cart />
        </>
      ),
    },
    {
      path: "/checkout",
      element: (
        <>
          <NavBar /> <Checkout />
        </>
      ),
    },
    {
      path: "/success",
      element: <Success />,
    },
    {
      path: "/cancel",
      element: <Cancel />,
    },
    {
      path: "/orders",
      element: (
        <>
          <NavBar />
          <OrderList />
        </>
      ),
    },
    {
      path: "/admin/orderupdate",
      element: (
        <>
          <NavBar />
          <AdminOrderUpdate />
        </>
      ),
    },
    {
      path: "*",
      element: <ErrorPage />,
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
