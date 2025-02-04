import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../utils/api";
const AdminEditForm = () => {
  const { id } = useParams();
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    image: "",
  });
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
  useEffect(() => {
    async function getProductvalues() {
      try {
        const response = await API.get(`/products/${id}`);
        setProduct({
          ...product,
          name: response.data.name,
          description: response.data.description,
          price: response.data.price,
          category: response.data.category,
          stock: response.data.stock,
          image: response.data.image,
        });
      } catch (err) {
        setAlert("Error Occured ! Please try again!");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1500);
        console.error("Error during API call:", err);
      }
    }
    getProductvalues();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("category", product.category);
    formData.append("stock", product.stock);

    if (product.image) {
      formData.append("image", product.image); // Append only if an image is selected
    }

    try {
      const response = await API.put(`/admin/products/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure the correct content type
        },
      });
      if (response.status === 200) {
        setAlert("Product has been Updated ! ");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1500);
        setAlert("redirecting to Admin Dashboard ");
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };
  console.log(`${process.env.REACT_APP_BACKEND_URL_UPLOADS}${product.image}`);
  return (
    <div className="container-fluid shadow-lg border-0 rounded-4 p-2 w-100 w-md-50 d-flex justify-content-center">
      <div className="col-12 col-md-9 col-lg-6 border p-3  shadow-lg rounded-4">
        {alert ? (
          <div class="alert alert-secondary" role="alert">
            {alert}
          </div>
        ) : (
          ""
        )}
        <h4 className="text-center">UPDATE PRODUCT</h4>
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
              min={1}
              className="form-control"
              id="exampleInputQuantity"
              name="stock"
              value={product.stock}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            {/* Display existing image if available */}
            {product.image && typeof product.image === "string" && (
              <div className="mb-2">
                <img
                  src={`${process.env.REACT_APP_BACKEND_URL_UPLOADS}${product.image}`} // API Image URL
                  alt="product"
                  className="img-fluid rounded"
                  style={{ maxWidth: "150px", maxHeight: "150px" }}
                />
              </div>
            )}
            <label className="form-label">Upload Product Image:</label>
            {/* File Input */}
            <input
              type="file"
              className="form-control"
              name="image"
              onChange={handleFileChange}
              accept="images/*"
            />
          </div>
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-dark btn-lg">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditForm;
