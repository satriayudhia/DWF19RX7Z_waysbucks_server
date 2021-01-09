import React, { useState, useEffect } from "react";
import Jumbotron from "../../../assets/images/Jumbotron-login.png";
import "./Content.scss";
import Product from "../../atoms/Product";
import { API } from "../../../config/API";
import LoadingPage from "../../atoms/LoadingPage";

const Content = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getAPI() {
      let response = await API.get("/products");
      setProducts(response.data.data.products);
    }
    getAPI();
  }, []);

  return !products ? (
    <LoadingPage />
  ) : (
    <div>
      <div className="jumbotron">
        <img src={Jumbotron} alt="Jumbotron" />
      </div>
      <p className="let-order">Let's Order</p>
      <div className="product-list">
        {products.map((product) => (
          <Product
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            photo={product.photo}
          />
        ))}
      </div>
    </div>
  );
};

export default Content;
