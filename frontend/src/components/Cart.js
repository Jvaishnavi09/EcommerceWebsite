import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { REMOVE_FROM_CART } from "../redux/cartSlice";
const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartProducts) || [];
  const [totalAmount, setTotalAmount] = useState(0);
  const isLoggedIn = useSelector((state) => state.user.loggedIn);
  console.log("isLoggedIn", isLoggedIn);
  const dispatch = useDispatch();
  console.log(cartItems, "cartItems");

  useMemo(() => {
    function calculateTotalPrice(items) {
      if (!Array.isArray(items)) return;
      const result = items.reduce((total, item) => {
        return total + (item.price || 0) * (item.quantity || 1);
      }, 0);
      setTotalAmount(result);
    }

    calculateTotalPrice(cartItems);
  }, [cartItems]);

  function handleRemove(id) {
    dispatch(REMOVE_FROM_CART(id));
  }
  return (
    <div className="container d-flex flex-column justify-items-center align-items-center my-2 mb-3">
      <h2 className="text-center my-4">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center">
          <h4 className="text-muted">No products added to the cart.</h4>
        </div>
      ) : (
        <div className="d-flex flex-column justify-items-center align-items-center gap-4 col-sm-12 col-md-9 ">
          {cartItems.map((product, index) => (
            <div key={index}>
              <div className="d-flex p-2 flex-column justify-content-center align-items-center shadow-lg rounded-4">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL_UPLOADS}${product.image}`}
                  className="card-img-top rounded-top"
                  alt={product.name}
                  style={{ height: "250px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-secondary">
                    {product.description}
                  </p>
                  <p className="card-text fw-bold">Price: ${product.price}</p>
                  <p className="card-text text-muted">
                    Category: {product.category}
                  </p>
                  <div className="d-flex justify-content-between">
                    <p className="card-text">
                      Quantity:{" "}
                      <span className="fw-bold">{product.quantity}</span>
                    </p>
                    <p className="card-text">
                      Amount :{" "}
                      <span className="fw-bold">
                        {parseFloat(
                          (product.price || 0) * (product.quantity || 1)
                        ).toFixed(2)}
                      </span>
                    </p>
                  </div>

                  <button
                    className="btn btn-danger w-100"
                    onClick={() => {
                      handleRemove(product._id);
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="card-text mt-2">
        Total Amount :{" "}
        <span className="fw-bold"> $ {totalAmount.toFixed(2)}</span>
      </p>
      <Link to={isLoggedIn ? "/checkout" : "/login"}>
        <button
          className={`btn btn-dark w-100 my-3 ${
            cartItems.length === 0 ? "disabled" : ""
          } `}
        >
          Proceed to Checkout
        </button>
      </Link>
    </div>
  );
};

export default Cart;
