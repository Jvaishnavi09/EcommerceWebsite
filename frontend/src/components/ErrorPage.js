import React from "react";
import { Link } from "react-router-dom";
const ErrorPage = ({ error }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center mt-4  vh-100">
      <h3 className="text-center"> ERROR PAGE </h3>
      <p>{error ? "" : ""}</p>
      <img
        src="/error.gif"
        alt="err"
        style={{ objectFit: "contain", height: "250px", width: "250px" }}
      />
      <Link to="/" className="btn btn-dark  btn-lg">
        Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
