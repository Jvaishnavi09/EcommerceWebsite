import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { useSelector } from "react-redux";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.cartProducts);
  const [orderId, setOrderId] = useState(null);
  const [isOrderCreated, setIsOrderCreated] = useState(false); // Track if order is created

  // Function to create the order
  async function createOrder() {
    //calculate Cart Total Amount
    const result = cart.reduce((total, item) => {
      return total + (item.price || 0) * (item.quantity || 1);
    }, 0);

    try {
      const data = await API.post("/orders/", {
        products: cart,
        total: result,
      });
      setOrderId(data.data._id); // Set the order ID
      setIsOrderCreated(true); // Mark order as created
    } catch (err) {
      console.log("Error while creating order", err);
    }
  }

  const createCheckoutSession = async () => {
    if (!orderId) {
      console.error("Order ID is not available");
      return;
    }

    const cartMade = cart.map((cartItem) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: cartItem.name,
        },
        unit_amount: Math.round(cartItem.price * 100), // Stripe requires amount in cents
      },
      quantity: cartItem.quantity,
    }));

    try {
      const response = await API.post("/create-checkout-session", {
        line_items: cartMade,
        orderId, // Send the order ID
      });

      if (response.data.url) {
        window.location.href = response.data.url; // Redirect to Stripe checkout page
      }
    } catch (err) {
      console.error("Stripe checkout failed", err.message);
    }
  };

  // Effect to create the order and then create the checkout session
  useEffect(() => {
    if (cart.length > 0 && !isOrderCreated) {
      createOrder();
    }
  }, [cart, isOrderCreated]);

  // Effect to create the checkout session after the order is created
  useEffect(() => {
    if (isOrderCreated && orderId) {
      createCheckoutSession();
    }
  }, [isOrderCreated, orderId]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center  vh-90 my-5">
      <h6 className="fw-bolder">Redirecting ...</h6>
      <img
        src="/three.gif"
        alt="redirecting"
        className=""
        style={{ height: "150px", width: "350px" }}
      />
    </div>
  );
};

export default Checkout;
