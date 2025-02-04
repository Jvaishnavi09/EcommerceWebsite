import React, { useEffect, useState } from "react";
import API from "../utils/api";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get(
          `/products?page=${currentPage}&limit=${10}`
        );
        setProducts(data.products);
        setTotalPage(data.totalPages);
        setLoading(false);
      } catch (err) {
        setError("Failed to Admin Page.");
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage]);

  async function handleDelete(id) {
    try {
      let result = window.confirm("Are you sure you want to Delete ?");
      if (result) {
        const { data } = await API.delete(`/admin/products/${id}`);
        setAlert(data.message);
      }
    } catch (err) {
      setAlert("Failed to Delete ! please try again later ");
    }
  }

  if (loading) {
    return <div>Loading...</div>; // Fallback UI for loading state
  }
  if (error) {
    return <div>{error}</div>; // Fallback UI for error state
  }
  return (
    <div className="container-fluid">
      {alert ? (
        <div class="alert alert-secondary" role="alert">
          {alert}
        </div>
      ) : (
        ""
      )}
      <div className="row my-4">
        <div className="col-12">
          <h1 className="text-center">Admin Dashboard</h1>
        </div>
      </div>

      <div className="row">
        {/* Stats Section */}
        <div className="col-lg-3 col-md-3 col-sm-6 mb-4">
          <div className="card shadow-lg mb-3 border-0">
            <div className="card-body">
              <h5 className="card-title">Product Stats</h5>
              <p>Total Products: {totalPages * 10}</p>
              <button className="btn btn-dark btn-block">
                <Link
                  to="/admin/productform"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Add New Product
                </Link>
              </button>
            </div>
          </div>
          <div className="card shadow-lg border-0">
            <div className="card-body">
              <h5 className="card-title">Order Action Item</h5>
              <button className="btn btn-dark btn-block">
                <Link
                  to="/admin/orderupdate"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Update Order Status
                </Link>
              </button>
            </div>
          </div>
        </div>

        {/* Product List Section */}
        <div className="col-lg-9 col-md-9 col-sm-12 mb-4  ">
          <div className="card shadow-lg border-0">
            <div className="card-body">
              <h2 className="card-title">Product List Added : </h2>
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id} className="fs-sm-3">
                      <td>{product.name.slice(0, 50)}</td>
                      <td>${product.price}</td>
                      <td className="d-flex gap-2">
                        <button
                          style={{
                            border: "none",
                            backgroundColor: "transparent",
                          }}
                        >
                          <Link
                            className="btn btn-dark btn-md mr-4"
                            to={`/admin/productEdit/${product._id}`}
                          >
                            Edit
                          </Link>
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(product._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <nav className="d-flex justify-content-center mt-2">
              <ul className="pagination">
                <li
                  key="previous"
                  className={`page-item ${
                    currentPage - 1 === 0 ? "disabled" : ""
                  }`}
                  onClick={() =>
                    currentPage - 1 === 0
                      ? ""
                      : setCurrentPage((prevCurrentPage) =>
                          Math.max(1, currentPage - 1)
                        )
                  }
                >
                  <p
                    className="page-link"
                    style={{
                      fontWeight: "normal",
                      color: "black",
                    }}
                  >
                    {`<<`}
                  </p>
                </li>
                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((pageNumber) => (
                  <li
                    key={pageNumber}
                    className="page-item "
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    <p
                      className="page-link"
                      style={{
                        fontWeight:
                          currentPage === pageNumber ? "bold" : "normal",
                        color: "black",
                      }}
                    >
                      {pageNumber}
                    </p>
                  </li>
                ))}
                <li
                  key="next"
                  className={`page-item ${
                    currentPage + 1 >= totalPages ? "disabled" : ""
                  }`}
                  onClick={() =>
                    currentPage === totalPages
                      ? ""
                      : setCurrentPage(currentPage + 1)
                  }
                >
                  <p
                    className="page-link"
                    style={{
                      fontWeight: "normal",
                      color: "black",
                    }}
                  >
                    {`>>`}
                  </p>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
