import React, { useEffect, useState } from "react";
import API from "../utils/api";
const OrderList = () => {
  const [order, setOrders] = useState("");
  const [isorderSet, setisorderSet] = useState(false);
  useEffect(() => {
    async function getUserOrder() {
      try {
        const response = await API.get("/orders");
        console.log(response.data);
        setOrders(response.data);
        setisorderSet(true);
      } catch (error) {
        console.log("getting error while fetching user orders", error.message);
      }
    }
    getUserOrder();
  }, []);

  return (
    <div className="container-fluid mt-4">
      {isorderSet ? (
        <div className="section row justify-content-center p-3">
          <h4 className="text-center my-2 fw-bold"> ORDERS LIST </h4>
          {order.map((orderItem) => (
            <div
              className="col-12  col-sm-12 col-md-6 col-lg-4 m-4 d-flex flex-column border shadow-lg rounded-4 justify-content-center gap-4 p-2"
              style={{ minWidth: "18rem" }}
              key={orderItem._id}
            >
              <p className="fw-bold">
                Total Price :{" "}
                <span className="fw-bold">$ {orderItem.total}</span>{" "}
              </p>
              <p className="fw-bold">
                Order id :
                <span
                  style={{ textDecoration: "underline", fontWeight: "400" }}
                >
                  {"   "}
                  {orderItem._id}
                </span>
              </p>
              <p className="fw-bold">
                {" "}
                Order status : <span>{orderItem.status}</span>{" "}
              </p>
              {orderItem.products.map((product) => (
                <div key={product._id._id}>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL_UPLOADS}${product._id.image}`}
                    className="card-img-top"
                    style={{ objectFit: "contain", maxHeight: "200px" }}
                    alt="..."
                  />
                  <div className="card-body">
                    <p className="fw-bold">{product._id.name}</p>
                    <p className="fw-normal">
                      Price per Unit :{" "}
                      <span className="fw-bold">${product._id.price}</span>
                    </p>
                    <p>
                      Quanity :{" "}
                      <span className="fw-bold">{product.quantity}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>NO ORDERS MADE</p>
      )}
    </div>
  );
};

export default OrderList;
