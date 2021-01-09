import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../config/Context";
import axios from "axios";
import { useHistory } from "react-router-dom";
import NumberFormat from "react-number-format";
import "./ProductCart.scss";
import Bin from "../../../assets/logos/bin.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link, withRouter } from "react-router-dom";
import { API } from "../../../config/API";

const ProductCart = (props) => {
  //Get UserInfo
  const user = JSON.parse(localStorage.getItem("userInfo"));
  //Context
  const [state, dispatch] = useContext(AppContext);

  const router = useHistory();

  const deleteCart = async (id) => {
    let transaction = await API.get(`/transaction-user/${user.id}`);
    let transactionId = transaction.data.data.transaction.id;
    const data = { productId: id };
    const config = { headers: { "Content-Type": "application/json" } };
    await API.delete(
      `/delete-product-toping/${transactionId}`,
      { data: data },
      config
    );
    window.location.reload();
  };

  return (
    <Container>
      <Row className="cart-container">
        <Col sm={2} className="cart-img-wrapper">
          <img
            className="cart-img"
            src={`http://localhost:3001/uploads/${props.photo}`}
            alt="Image Coffe"
          />
        </Col>
        <Col sm={7} className="cart-product-wrapper">
          <Row>
            <Col>
              <p className="cart-product-name">{props.name}</p>
            </Col>
          </Row>
          <Row>
            <Col sm={2} className="cart-toping-title">
              Toping:
            </Col>
            <Col sm={10} className="cart-toping-name">
              <p>
                {" "}
                {!props.topings ? (
                  <p>Loading...</p>
                ) : (
                  props.topings.map((top, index) => {
                    return <span key={index}>{top.name}, </span>;
                  })
                )}
              </p>
            </Col>
          </Row>
        </Col>
        <Col sm={2} className="cart-price-wrapper">
          <Row>
            <Col>
              <NumberFormat
                value={props.price}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rp, "}
                renderText={(value) => <p>{value}</p>}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <img
                onClick={() => deleteCart(props.id)}
                className="remove-bin"
                src={Bin}
                alt="Hapus"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductCart;
