import React, { useState } from "react";
import API from "../utils/api";
import { setUserDetails, setLoggedIn } from "../redux/userSilce";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(null);
  const [showpassword, setShowpassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/login", { email, password });
      const userDetails = {
        email: data.userDetails.email,
        name: data.userDetails.name,
        role: data.userDetails.role,
      };

      dispatch(setLoggedIn(true));
      dispatch(setUserDetails(userDetails));
      setAlert(data.message);
      setTimeout(() => navigate("/"), 1800);
    } catch (err) {
      setAlert("Login failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="container d-flex flex-column justify-content-center col-12  col-sm-12  col-md-6 col-lg-5 align-items-center my-3">
      <div>
        {alert && (
          <div className={`alert p-2 alert-secondary text-white`}>{alert}</div>
        )}
      </div>

      <div className="card shadow-lg border-1 rounded-start rounded-4 p-4 w-100  w-md-100 w-lg-40">
        <h3 className="text-center mb-4">Signin </h3>
        <form onSubmit={handleSubmit} className="d-flex flex-column">
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 password-container">
            <input
              type={showpassword ? "text" : "password"}
              className="form-control"
              id="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span>
              <img
                src={showpassword ? "/view.png" : "/eye.png"}
                id="togglepassword"
                alt="password-eye"
                style={{ width: "20px", height: "20px" }}
                onClick={() => setShowpassword(!showpassword)}
              />
            </span>
          </div>
          <button type="submit" className="btn btn-dark w-100 mt-3">
            Signin
          </button>
        </form>
      </div>
      <div>
        <p className="mt-3">Not yet registered ? </p>
        <Link to="/register">
          <button className="btn btn-dark w-100 mt-2">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
