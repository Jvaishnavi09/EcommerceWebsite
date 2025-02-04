import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(6);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  useEffect(() => {
    if (timer === 0) {
      navigate("/");
    }
  }, [timer, navigate]);

  return (
    <div className="container success-container col-sm-12 col-md-6  d-flex flex-column  justify-content-center align-items-center  vh-100">
      <p>
        Redirecting you in <span className="fw-bolder">{timer}</span> seconds{" "}
      </p>
      <div className="card container shadow-lg rounded-4 col-sm-12">
        <div className="card-body">
          <div className="check-icon">
            <i className="bi bi-check-circle-fill"></i>
          </div>
          <img
            src="/tick.png"
            alt="sucess"
            style={{ height: "40px", width: "40px" }}
          />
          <h2 className="text-success fw-bolder  mt-3 bold">
            Payment Successful! {alert ? alert : ""}
          </h2>
          <p className="lead">
            Thank you for your purchase. Your payment has been successfully
            processed.
          </p>
          <Link to="/" className="btn btn-dark w-100 mt-2">
            continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
