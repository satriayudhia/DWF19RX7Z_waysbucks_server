import React, { useState, useEffect } from "react";
import "./Admin.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HeaderAdmin from "../../components/molecules/HeaderAdmin";
import { API } from "../../config/API";
import ButtonOption from "../../components/atoms/ButtonOption";
import ButtonOptionApprove from "../../components/atoms/ButtonOptionApprove";
import Done from "../../assets/logos/done.svg";
import Cancel from "../../assets/logos/cancel.svg";
import Alert from "react-bootstrap/Alert";
import NumberFormat from "react-number-format";

const Admin = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const getAPI = async () => {
      try {
        let transactions = await API.get("/transactions");
        setTransactions(transactions.data.data.transactions);
        console.log("transactions", transactions.data.data.transactions);
        // if (transaction.data.status === "transaction data empty") {
        //   console.log("empty");
        // } else {
        //   setProducts(transaction.data.data.transaction.products);
        //   setQty(transaction.data.data.transaction.products.length);
        //   let newArray = [];
        //   products.map((product) => newArray.push(product.price));
        //   const total = newArray.reduce((a, b) => a + b, 0);
        //   setSubTotal(total);
        // }
      } catch (error) {
        console.log(error);
      }
    };
    getAPI();
  }, []);

  const handleCancel = async (id) => {
    const data = { status: "canceled" };
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      let transaction = await API.patch(
        `/transaction-status/${id}`,
        data,
        config
      );
      console.log("transaction", transaction);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async (id) => {
    const data = { status: "on the way" };
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      let transaction = await API.patch(
        `/transaction-status/${id}`,
        data,
        config
      );
      console.log("transaction", transaction);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return !transactions ? (
    <h1>Loading...</h1>
  ) : (
    <Container fluid>
      <HeaderAdmin />
      <Row className="admin-title">Income Transaction</Row>
      <Row className="admin-wrapper">
        <Col sm={1} className="border">
          No
        </Col>
        <Col sm={2} className="border">
          Name
        </Col>
        <Col sm={3} className="border">
          Address
        </Col>
        <Col sm={1} className="border">
          Pos Code
        </Col>
        <Col sm={1} className="border">
          Income
        </Col>
        <Col sm={2} className="border">
          Status
        </Col>
        <Col sm={2} className="border">
          Action
        </Col>
      </Row>
      {transactions.reverse().map((transaction, index) => (
        <Row
          style={{
            backgroundColor: index % 2 == 0 ? "#E5E5E5" : "transparent",
          }}
          className="admin-data-wrapper"
          key={transaction.id}
        >
          <Col sm={1} className="border-data">
            {index + 1}
          </Col>
          <Col sm={2} className="border-data">
            {transaction.name}
          </Col>
          <Col sm={3} className="border-data">
            {transaction.address}
          </Col>
          <Col sm={1} className="border-data">
            {transaction.posCode}
          </Col>
          <Col sm={1} className="border-data">
            <NumberFormat
              value={transaction.income}
              displayType={"text"}
              thousandSeparator={true}
              prefix={"Rp, "}
              renderText={(value) => <span>{value}</span>}
            />
          </Col>

          <Col sm={2} className="border-data">
            <Alert
              variant={
                transaction.status == "completed"
                  ? "success"
                  : transaction.status == "on the way"
                  ? "primary"
                  : transaction.status == "canceled"
                  ? "danger"
                  : transaction.status == "waiting approval"
                  ? "warning"
                  : "secondary"
              }
            >
              {transaction.status}
            </Alert>
          </Col>
          <Col sm={2} className="border-data">
            {transaction.status == "waiting approval" ? (
              <Row>
                <Col>
                  <ButtonOption
                    onClick={() => handleCancel(transaction.id)}
                    title="Cancel"
                  />
                </Col>
                <Col>
                  <ButtonOptionApprove
                    onClick={() => handleApprove(transaction.id)}
                    title="Approve"
                  />
                </Col>
              </Row>
            ) : transaction.status == "canceled" ? (
              <img src={Cancel} alt="Cancel" />
            ) : transaction.status == "completed" ? (
              <img src={Done} alt="Done" />
            ) : (
              <Alert variant="warning">Waiting user confirms</Alert>
            )}
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default Admin;
