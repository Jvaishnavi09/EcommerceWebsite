import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
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
    <div class="container success-container col-sm-12 col-md-6  d-flex flex-column  justify-content-center align-items-center  vh-100">
      <p>
        Redirecting you in <span className="fw-bolder">{timer}</span> seconds
      </p>
      <div class="card container shadow-lg rounded-4 col-sm-12">
        <div class="card-body">
          <div class="cancel-icon">
            <i class="bi bi-x-circle-fill"></i>
          </div>
          <img
            src="/delete.png"
            alt="cancelled"
            style={{ height: "40px", width: "40px" }}
          />
          <h2 class="text-danger fw-bolder  mt-3 ">Checkout Canceled</h2>
          <p class="lead">
            Forgot to add something to your cart? Shop around and then come back
            to pay!
          </p>
          <Link to="/" class="btn btn-dark w-100 mt-2">
            Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
