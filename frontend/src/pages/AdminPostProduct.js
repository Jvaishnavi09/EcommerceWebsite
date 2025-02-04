import React, { useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

const AdminPostProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: null,
  });
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setProduct({
      ...product,
      image: e.target.files[0], // Only stores the first file
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/admin/products", product, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type
        },
      });
      console.log("API Response:", response.statusText === "craeted");
      if (response.statusText === "created") {
        setAlert("Product has been Added! ");
        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
    setProduct({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      image: null,
    });
  };

  return (
    <div className="container-fluid shadow-lg border-0 rounded-4 p-2 w-100 w-md-50 d-flex  justify-content-center">
      {alert ? (
        <div class="alert alert-secondary" role="alert">
          {alert}
        </div>
      ) : (
        ""
      )}

      <div className="col-12 col-md-6 border p-3  shadow-lg rounded-4">
        <h4 className="text-center">ADD NEW PRODUCT</h4>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="exampleInputName" className="form-label">
              Name of the Product:
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputName"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputDesc" className="form-label">
              Description of the Product:
            </label>
            <textarea
              className="form-control"
              id="exampleInputDesc"
              name="description"
              rows="5"
              value={product.description}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPrice" className="form-label">
              Price of the Product $:
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputPrice"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputCategory" className="form-label">
              Category:
            </label>
            <input
              maxLength="30"
              type="text"
              className="form-control"
              id="exampleInputCategory"
              name="category"
              value={product.category}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputQuantity" className="form-label">
              Stock quantity of the Product:
            </label>
            <input
              type="number"
              className="form-control"
              id="exampleInputQuantity"
              name="stock"
              min={1}
              value={product.stock}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputFile" className="form-label">
              Insert Product Image:
            </label>
            <input
              type="file"
              className="form-control"
              id="exampleInputFile"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-dark">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPostProduct;
