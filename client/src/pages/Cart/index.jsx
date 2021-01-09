import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../config/Context";
import { Modal } from "react-bootstrap";
import { Formik, Form } from "formik";
import { useHistory } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import * as Yup from "yup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HeaderLogin from "../../components/molecules/HeaderLogin";
import ProductCart from "../../components/atoms/ProductCart";
import Attachment from "../../assets/logos/attachment.png";
import Button from "../../components/atoms/Button";
import Gap from "../../components/atoms/Gap";
import { API } from "../../config/API";
import NumberFormat from "react-number-format";
import "./Cart.scss";
import FormikControl from "../../config/FormikControl";

const Cart = () => {
  //Get UserInfo
  const user = JSON.parse(localStorage.getItem("userInfo"));
  //Context
  const [state] = useContext(AppContext);
  //Modal
  const [payStatus, setPayStatus] = useState(false);
  //Alert
  const [alertShow, setAlertShow] = useState(false);
  //State
  const [qty, setQty] = useState(0);
  const [products, setProducts] = useState([{}]);
  const [subTotal, setSubTotal] = useState(0);
  const [image, setImage] = useState({});
  const [imgPreview, setImgPreview] = useState("");

  const router = useHistory();

  //Initial State Formik
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    posCode: "",
    address: "",
  };

  //Schema validation form
  const validationSchema = Yup.object({
    name: Yup.string().required("required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    phone: Yup.number().required("required"),
    posCode: Yup.number().min(5).required("required"),
    address: Yup.string().required("required"),
  });

  useEffect(() => {
    const getAPI = async () => {
      try {
        let transaction = await API.get(`/transaction-user/${user.id}`);
        if (transaction.data.status === "transaction data empty") {
          console.log("empty");
        } else {
          setProducts(transaction.data.data.transaction.products);
          setQty(transaction.data.data.transaction.products.length);
          let newArray = [];
          products.map((product) => newArray.push(product.price));
          const total = newArray.reduce((a, b) => a + b, 0);
          setSubTotal(total);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAPI();
  }, [subTotal]);

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handlePayment = async (e) => {
    let transaction = await API.get(`/transaction-user/${user.id}`);
    const id = transaction.data.data.transaction.id;
    const config = { headers: { "Content-Type": "multipart/form data" } };
    const data = new FormData();
    data.append("name", e.name);
    data.append("email", e.email);
    data.append("phone", e.phone);
    data.append("posCode", e.posCode);
    data.append("address", e.address);
    data.append("income", subTotal);
    data.append("status", "waiting approval");
    data.append("attachment", image);

    try {
      if (!data.attachment) {
        setAlertShow(true);
      }
      await API.patch(`/transaction/${id}`, data, config);
      if (alertShow) {
        setAlertShow(false);
      }
      setPayStatus(true);
      await timeout(3000);
      router.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileUpload = (e) => {
    setImage(e.target.files[0]);
    setImgPreview(URL.createObjectURL(e.target.files[0]));
    console.log("image", image);
  };

  return !products && !subTotal ? (
    <h1>Loading...</h1>
  ) : (
    <Container fluid className="cart-wrapper">
      <HeaderLogin />
      <Row>
        <Col className="top-cart-mycart">
          <p>My Cart</p>
        </Col>
      </Row>
      <Row>
        <Col className="top-cart-review">
          <p>Review Your Order</p>
        </Col>
      </Row>
      <Row>
        <Col className="left-cart-detail">
          {products.map((product, index) => (
            <ProductCart
              key={index}
              id={product.id}
              name={product.name}
              photo={product.photo}
              price={product.price}
              topings={product.topings}
            />
          ))}
          <Row>
            <Col className="garis" />
          </Row>
          <Row>
            <Col>
              <Row className="garis-subtotal" />
              <Row className="subtotal-price">
                <Col>Subtotal</Col>
                <Col className="align-right">
                  <NumberFormat
                    value={!subTotal ? 0 : subTotal}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Rp, "}
                    renderText={(value) => <span>{value}</span>}
                  />
                </Col>
              </Row>
              <Row className="subtotal-price">
                <Col>Qty</Col>
                <Col className="align-right">{qty}</Col>
              </Row>
              <Row className="garis-subtotal" />
              <Row className="total-price">
                <Col>Total</Col>
                <Col className="align-right">
                  <NumberFormat
                    value={!subTotal ? 0 : subTotal}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Rp, "}
                    renderText={(value) => <span>{value}</span>}
                  />
                </Col>
              </Row>
            </Col>
            <Col className="attachment">
              <label for="attachment">
                <img
                  className="attachment-img"
                  src={!imgPreview ? Attachment : imgPreview}
                  alt="attachment"
                />
              </label>
            </Col>
          </Row>
        </Col>
        <Col className="payment-column">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(e) => handlePayment(e)}
          >
            {(formik) => {
              return (
                <Form>
                  <FormikControl
                    className="form-input"
                    placeholder="Name"
                    control="input"
                    type="text"
                    name="name"
                  />
                  <Gap height={20} />
                  <FormikControl
                    className="form-input"
                    placeholder="Email"
                    control="input"
                    type="email"
                    name="email"
                  />
                  <Gap height={20} />
                  <FormikControl
                    className="form-input"
                    placeholder="Phone"
                    control="input"
                    type="tel"
                    name="phone"
                  />
                  <Gap height={20} />
                  <FormikControl
                    className="form-input"
                    placeholder="Pos Code"
                    control="input"
                    type="text"
                    name="posCode"
                  />
                  <Gap height={20} />
                  <FormikControl
                    className="form-textarea"
                    placeholder="Address"
                    control="textarea"
                    type="text"
                    name="address"
                  />
                  <Gap height={20} />
                  <input
                    id="attachment"
                    name="attachment"
                    accept="image/*"
                    type="file"
                    onChange={handleFileUpload}
                    style={{ display: "none" }}
                  />
                  {alertShow && (
                    <Alert
                      className="alert-log"
                      variant="danger"
                      onClose={() => setAlertShow(false)}
                    >
                      Please upload proof of transaction
                    </Alert>
                  )}
                  <Button
                    title="Pay"
                    type="submit"
                    disabled={!formik.isValid}
                  />
                </Form>
              );
            }}
          </Formik>
        </Col>
      </Row>
      <Modal
        size="lg"
        show={payStatus}
        onHide={() => setPayStatus(false)}
        dialogClassName="modal-payment"
        centered
      >
        <Modal.Body className="text-center">
          <p className="order-status">
            Thank you for ordering in us, please wait to verify your order
          </p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Cart;
