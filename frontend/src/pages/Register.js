import React, { useState } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [alert, setAlert] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/register", {
        username,
        email,
        password,
        role,
      });
      setAlert(data.message);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setAlert("Register failed! Please Try Again");
    }
  };

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  return (
    <>
      <div className="container  d-flex flex-column  justify-content-center col-12  col-sm-12  col-md-6 col-lg-5 align-items-center vh-90 my-3">
        {alert.length > 3 ? (
          <div
            className={`alert p-2 alert-secondary text-white w-75 m-4  text-center `}
          >
            {alert}
          </div>
        ) : (
          ""
        )}
        <div className="d-flex border-0 shadow-lg rounded-4  w-100">
          <form
            onSubmit={handleSubmit}
            style={{ maxWidth: "450px" }}
            className="d-flex flex-column w-100 p-4 "
          >
            <h4 className="mb-5 text-center">Register</h4>

            <input
              className="form-control mb-3"
              type="text"
              placeholder="Enter your Name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="form-control mb-3"
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
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

            <div className="mb-3">
              <div className="btn-group w-100">
                <button
                  type="button"
                  className="btn btn-secondary dropdown-toggle w-100"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {role ? role : "Select your Role"}
                </button>
                <ul className="dropdown-menu w-100 ">
                  <li>
                    <Link
                      className="dropdown-item w-50"
                      type="button"
                      value="user"
                      onClick={handleChange}
                    >
                      User
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item w-50"
                      type="button"
                      value="admin"
                      onClick={handleChange}
                    >
                      Admin
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <button type="submit" className="btn btn-dark w-100 mt-2">
              Register
            </button>
          </form>
        </div>

        <div className="mt-3 text-center">
          <p>Already Registered?</p>
          <Link to="/login" className="btn btn-dark w-100 mt-2">
            Signin
          </Link>
        </div>
      </div>
    </>
  );
};

export default Register;
