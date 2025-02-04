import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setLoggedIn, setUserDetails } from "../redux/userSilce";
import { Link } from "react-router-dom";
import API from "../utils/api";

const NavBar = () => {
  const userLoggedIn = useSelector((state) => state.user.loggedIn);
  const userRole = useSelector((state) => state.user.userDetails.role);
  const products = useSelector((state) => state.cart.cartProducts);
  const [alert, setAlert] = useState("");
  const [nocartItems, setNoOfCartItems] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setNoOfCartItems(products.length);
  }, []);
  async function handleLogout() {
    try {
      const { data } = await API.get("/auth/logout");
      console.log(data.message, data.userDetails, "logout");
      dispatch(setLoggedIn(false));
      dispatch(
        setUserDetails({
          email: "",
          name: "Guest",
          role: "user",
        })
      );
      setAlert("Logging Out..");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="/logo192.png"
              style={{ height: "30px", width: "30px" }}
              alt="logo"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {userLoggedIn ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/profile">
                      <img
                        src="/profile-user.png"
                        alt="profile"
                        style={{ width: "20px", height: "20px" }}
                      />
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>{" "}
                </>
              )}
              {userRole === "admin" ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/dashboard">
                    Admin Dashboard
                  </Link>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link" to="/cart">
                    <div
                      style={{ position: "relative", display: "inline-block" }}
                    >
                      {/* Cart Icon */}
                      <img
                        src="/shopping-cart.png"
                        style={{
                          height: "25px",
                          width: "25px",
                        }}
                        alt="cart"
                      />

                      {/* Cart Badge */}
                      <div
                        style={{
                          position: "absolute",
                          top: "-5px",
                          right: "-5px",
                          backgroundColor: "rgb(84, 88, 84, 0.5)",
                          color: "white",
                          borderRadius: "50%",
                          width: "15px",
                          height: "15px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "12px",
                          fontWeight: "bold",
                        }}
                      >
                        {nocartItems}
                      </div>
                    </div>
                  </Link>
                </li>
              )}
              {userLoggedIn && userRole === "user" ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/orders">
                    Orders
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
      {alert ? (
        <div class="alert alert-secondary" role="alert">
          {alert}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default NavBar;
