import React from "react";
import { useNavigate } from "react-router-dom";

const ProductList = ({ products }) => {
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/product/${id}`);
  }

  return (
    <div className="d-flex flex-wrap ">
      {products.length === 0 ? (
        <h4 className="w-100 text-center">No Products Found</h4>
      ) : (
        <div className="d-flex flex-wrap gap-4 justify-content-center mt-3">
          {products.map((product) => (
            <div
              key={product._id}
              className="card cardhover shadow-lg border-0"
              style={{ width: "16rem", cursor: "pointer" }}
              onClick={() => handleClick(product._id)}
            >
              <img
                src={`${process.env.REACT_APP_BACKEND_URL_UPLOADS}${product.image}`}
                alt={product.name}
                className="card-img-top  img-fluid"
              />
              <div className="card-body">
                <h6 className="card-text fw-normal">
                  {product.name.substring(0, 80)}
                </h6>
                <p
                  className="card-text text-center fw-bolder "
                  style={{ fontSize: "18px" }}
                >
                  {" "}
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
