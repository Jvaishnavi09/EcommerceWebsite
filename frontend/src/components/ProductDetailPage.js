import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../redux/cartSlice";

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alert, setAlert] = useState("");
  const [productAdded, setProductAdded] = useState(false);
  const [productdesc, setProductDesc] = useState("");
  const dispatch = useDispatch();

  const min = 1;
  const max = 10;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await API.get(`/products/${id}`);
        setProduct(data);

        setLoading(false);
      } catch (err) {
        setError("Failed to load product.");
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const increaseQuantity = () => quantity < max && setQuantity(quantity + 1);
  const decreaseQuantity = () => quantity > min && setQuantity(quantity - 1);
  const handleChange = (e) => {
    let value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) ? min : Math.max(min, Math.min(max, value)));
  };

  const handleAddToCart = () => {
    dispatch(ADD_TO_CART({ ...product, quantity }));
    setProductAdded(true);
    setAlert("Product added to cart!");
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <div className="container  d-flex flex-column  justify-content-center  align-items-center py-3">
      {alert && (
        <div className="alert  alert-secondary text-white text-center p-2">
          {alert}
        </div>
      )}
      <div className="shadow-lg border-0 rounded-4 p-2 col-sm-12 col-md-9">
        <div className="d-flex flex-column flex-md-row justify-content-center ">
          <img
            src={`${process.env.REACT_APP_BACKEND_URL_UPLOADS}${product.image}`}
            className="img-fluid"
            style={{ objectFit: "contain", maxHeight: "180px" }}
            alt={product.name}
          />
        </div>

        <div className="">
          <div>
            <div className="text-center card-title fw-bold">{product.name}</div>
            <p className="mt-3">
              Price per unit :{" "}
              <span className="fw-bold mt-2">${product.price}</span>
            </p>
            <div className="">
              {product.description
                .split(/[.\n]+/)
                .filter((sentence) => sentence.trim() !== "")
                .map((item, index) => (
                  <p key={index}>{item.trim()}</p>
                ))}
            </div>
          </div>

          <div className="d-flex  justify-content-around">
            <p className="fw-bold">Quantity:</p>
            <div className="d-flex">
              <button
                className="btn btn-outline-secondary"
                onClick={decreaseQuantity}
                disabled={quantity <= min}
              >
                -
              </button>
              <input
                type="number"
                className="form-control text-center mx-2"
                value={quantity}
                onChange={handleChange}
                style={{ width: "60px" }}
              />
              <button
                className="btn btn-outline-secondary"
                onClick={increaseQuantity}
                disabled={quantity >= max}
              >
                +
              </button>
            </div>
          </div>
          <button
            className={`btn w-100 mt-2 ${
              productAdded ? "btn-light" : "btn-dark"
            }`}
            onClick={handleAddToCart}
          >
            {productAdded ? "Added to Cart" : "ADD TO CART"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
