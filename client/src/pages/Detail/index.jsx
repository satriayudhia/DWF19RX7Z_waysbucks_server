import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../config/Context";
import { useHistory } from "react-router-dom";
import axios from "axios";
import NumberFormat from "react-number-format";
import "./Detail.scss";
import HeaderLogin from "../../components/molecules/HeaderLogin";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "../../components/atoms/Button";
import { API } from "../../config/API";
import LoadingPage from "../../components/atoms/LoadingPage";

const Detail = (props) => {
  //Get UserInfo
  const user = JSON.parse(localStorage.getItem("userInfo"));
  //Context
  const [state, dispatch] = useContext(AppContext);

  //Initial State
  const [topings, setTopings] = useState([]);
  const [product, setProduct] = useState({});
  const [topingPrice, setTopingPrice] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function getAPI() {
      let id = props.match.params.id;
      let resTopings = await API.get("/topings");
      setTopings(resTopings.data.data.topings);
      let resProducts = await API.get(`/product/${id}`);
      setProduct(resProducts.data.data.product);
    }
    getAPI();
  }, []);

  useEffect(() => {
    let priceList = topingPrice.map((prices) => parseInt(prices.price));
    let sum = priceList.reduce((a, b) => a + b, 0);
    let sumTotal = product.price + sum;
    setTotal(sumTotal);
    // console.log("Toping price", topingPrice)
  }, [topingPrice]);

  const router = useHistory();

  const handleTotal = (price, id, name) => {
    let x = document.getElementById(name).checked;
    // console.log("x", x)
    if (x) {
      const changeData = topingPrice.concat({ id: id, price: price });
      return setTopingPrice(changeData);
    } else {
      let newArray = topingPrice.filter((item) => {
        if (item.id !== id) {
          return item;
        }
      });
      setTopingPrice(newArray);
    }
  };

  const toCart = async () => {
    const config = { headers: { "Content-Type": "application/json" } };
    const checkTransaction = await API.get(`/transaction-user/${user.id}`);

    if (checkTransaction.data.status === "transaction data empty") {
      await API.post(
        "/transaction",
        { userId: user.id, status: "ordering" },
        config
      );
      const userTransaction = await API.get(`/transaction-user/${user.id}`);

      const transactionId = userTransaction.data.data.transaction.id;
      const dataProductToping = {
        transactionId: transactionId,
        ProductId: product.id,
        TopingId: null,
      };
      if (topingPrice.length === 0) {
        await API.post("/product-toping", dataProductToping, config);
      } else {
        for (let i = 0; i < topingPrice.length; i++) {
          await API.post(
            "/product-toping",
            {
              transactionId: transactionId,
              ProductId: product.id,
              TopingId: topingPrice[i].id,
            },
            config
          );
        }
      }
    } else {
      const userTransaction = await API.get(`/transaction-user/${user.id}`);

      const transactionId = userTransaction.data.data.transaction.id;
      const dataProductToping = {
        transactionId: transactionId,
        ProductId: product.id,
        TopingId: null,
      };
      if (topingPrice.length === 0) {
        await API.post("/product-toping", dataProductToping, config);
      } else {
        for (let i = 0; i < topingPrice.length; i++) {
          await API.post(
            "/product-toping",
            {
              transactionId: transactionId,
              ProductId: product.id,
              TopingId: topingPrice[i].id,
            },
            config
          );
        }
      }
    }
    dispatch({
      type: "ADD_CART",
    });
    router.push("/cart");
  };

  return !topings && !product ? (
    <LoadingPage />
  ) : (
    <Container fluid>
      <HeaderLogin />
      <Row>
        <Col sm={4} className="image-product-wrapper">
          <img
            className="img-product-detail"
            src={`http://localhost:3001/uploads/${product.photo}`}
            alt="Ice Coffe Palm Sugar"
          />
        </Col>
        <Col sm={6} className="detail-product-wrapper">
          <Row className="product-title-detail">
            <p>{product.name}</p>
          </Row>
          <Row className="product-price-detail">
            <NumberFormat
              value={product.price}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp, "}
              renderText={(value) => <p>{value}</p>}
            />
          </Row>
          <Row className="product-toping-detail">
            <p>Toping</p>
          </Row>
          <Row className="product-toping-list">
            {topings.map((toping) => (
              <div key={toping.id} className="toping-wrapper">
                <div className="round">
                  <label htmlFor={toping.name}>
                    <img
                      className="img-toping1"
                      src={`http://localhost:3001/uploads/${toping.photo}`}
                      alt="toping"
                    />
                  </label>
                  <input
                    onChange={() =>
                      handleTotal(toping.price, toping.id, toping.name)
                    }
                    value={toping.price}
                    type="checkbox"
                    id={toping.name}
                  />
                  <label className="label-checkbox" for={toping.name}></label>
                </div>
                <div className="title-toping-wrapper">
                  <p className="title-toping">{toping.name}</p>
                  <NumberFormat
                    value={toping.price}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Rp, "}
                    renderText={(value) => (
                      <p className="title-toping-price">{value}</p>
                    )}
                  />
                </div>
              </div>
            ))}
          </Row>
          <Row className="total-product">
            <Col>
              <p>Total</p>
            </Col>
            <Col className="total-product-price">
              <NumberFormat
                value={!total ? product.price : total}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp, "}
                renderText={(value) => <p className="product-price">{value}</p>}
              />
            </Col>
          </Row>
          <Row>
            <Button
              onClick={() => toCart(product.id)}
              className="btn-add-cart"
              title="Add Cart"
            />
          </Row>
        </Col>
      </Row>
      {/* <pre>{JSON.stringify(topingPrice, null, 2)}</pre> */}
    </Container>
  );
};

export default Detail;
