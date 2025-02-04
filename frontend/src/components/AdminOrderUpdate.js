import React, { useEffect, useState } from "react";
import API from "../utils/api";

const AdminOrderUpdate = () => {
  const [order, setOrders] = useState([]);
  const [isOrderSet, setIsOrderSet] = useState(false);
  const [selectedValue, setSelectedValue] = useState({});
  const [alert, setAlert] = useState("");

  useEffect(() => {
    async function getAllOrders() {
      try {
        const orders = await API.get("admin/orders");
        setOrders(orders.data);
        setIsOrderSet(true);
      } catch (err) {
        console.log("Error while fetching Orders", err.message);
      }
    }
    getAllOrders();
  }, []);

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    try {
      const response = await API.put(`admin/orders/${id}`, {
        status: selectedValue[id] || "",
      });

      if (response.status === 201) {
        setAlert("Order status updated successfully!");
        setTimeout(() => setAlert(""), 3000);
      }
    } catch (err) {
      console.log("Error updating order status", err.message);
    }
  };

  return (
    <div className="container-fluid mt-4">
      {alert && (
        <div className="alert alert-secondary text-center  p-2 text-white">
          {alert}
        </div>
      )}

      {isOrderSet ? (
        <div className="row justify-content-center">
          <h4 className="text-center my-2 fw-bold"> ORDERS LIST </h4>
          {order.map((orderItem) => (
            <div
              key={orderItem._id}
              className=" col-12  col-sm-12 col-md-6 col-lg-4 mb-4 d-flex justify-content-center"
            >
              <div className="cardhover col-12  col-sm-12 card shadow-lg border-0 rounded-4 p-1">
                <h5 className="card-title text-center fw-bold">
                  Order ID: {orderItem._id}
                </h5>
                <p className="text-center text-muted">
                  <strong>Total Price:</strong> ${orderItem.total}
                </p>
                <p className="text-center">
                  <strong>Status:</strong> {orderItem.status}
                </p>

                <div className="order-items">
                  {orderItem.products.map((product) => (
                    <div
                      key={product._id._id}
                      className="d-flex align-items-center mb-3 border-bottom pb-2"
                    >
                      <img
                        src={`${process.env.REACT_APP_BACKEND_URL_UPLOADS}${product._id.image}`}
                        alt="Product"
                        className="img-fluid rounded"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                      <div className="ms-3">
                        <h6 className="mb-1">{product._id.name}</h6>
                        <p className="mb-0">
                          Price: ${product._id.price} | Qty: {product.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <form
                  onSubmit={(e) => handleUpdate(e, orderItem._id)}
                  className="mt-3"
                >
                  <label
                    htmlFor={`status-${orderItem._id}`}
                    className="fw-bold"
                  >
                    Update Status:
                  </label>
                  <select
                    id={`status-${orderItem._id}`}
                    className="form-select mb-3"
                    value={selectedValue[orderItem._id] || ""}
                    onChange={(e) =>
                      setSelectedValue({
                        ...selectedValue,
                        [orderItem._id]: e.target.value,
                      })
                    }
                  >
                    <option value="">-- Select Status --</option>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>

                  <button type="submit" className="btn btn-dark w-100">
                    UPDATE ORDER
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">No orders available.</p>
      )}
    </div>
  );
};

export default AdminOrderUpdate;
