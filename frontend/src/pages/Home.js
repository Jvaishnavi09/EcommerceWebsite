import React, { useEffect, useState } from "react";
import API from "../utils/api";
import ProductList from "../components/ProductList";
import NavBar from "../components/NavBar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPage] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await API.get(
        `/products?page=${currentPage}&limit=${20}`
      );
      console.log(`/products?page=${currentPage}&limit=${20}`);
      console.log(data, "data");
      setTotalPage(data.totalPages);
      setProducts(data.products);
    };
    fetchProducts();
  }, [currentPage]);

  return (
    <div>
      <NavBar />
      <ProductList products={products} />
      <nav className="d-flex justify-content-center mt-2">
        <ul className="pagination">
          <li
            key="previous"
            className={`page-item ${currentPage - 1 === 0 ? "disabled" : ""}`}
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
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <li
                key={pageNumber}
                className="page-item"
                onClick={() => setCurrentPage(pageNumber)}
              >
                <p
                  className="page-link"
                  style={{
                    fontWeight: currentPage === pageNumber ? "bold" : "normal",
                    color: "black",
                  }}
                >
                  {pageNumber}
                </p>
              </li>
            )
          )}
          <li
            key="next"
            className={`page-item ${
              currentPage + 1 >= totalPages ? "disabled" : ""
            }`}
            onClick={() =>
              currentPage === totalPages ? "" : setCurrentPage(currentPage + 1)
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
  );
};

export default Home;
