import React, { useEffect, useContext, useState } from "react";
import NumberFormat from "react-number-format";
import { API } from "../../config/API";
import { Modal } from "react-bootstrap";
import "./MyProfile.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HeaderLogin from "../../components/molecules/HeaderLogin";
import Gap from "../../components/atoms/Gap";
import ProductTransaction from "../../components/atoms/ProductTransaction";
import Logo from "../../assets/logos/logoProduct.png";
import QR from "../../assets/logos/qr-code.png";
import ButtonOptionConfirm from "../../components/atoms/ButtonOptionConfirm";
import ButtonOptionApprove from "../../components/atoms/ButtonOptionApprove";
import ButtonOption from "../../components/atoms/ButtonOption";

const MyProfile = () => {
  //Get UserInfo
  const user = JSON.parse(localStorage.getItem("userInfo"));
  //Modal
  const [confirmShow, setConfirmShow] = useState(false);
  //State
  const [products, setProducts] = useState([{}]);
  const [dataTransaction, setDataTransaction] = useState([{}]);
  const [page, setPage] = useState(false);
  const [userData, setUserData] = useState({});
  const [image, setImage] = useState({});
  const [imgPreview, setImgPreview] = useState("");

  const getUser = async () => {
    try {
      const userData = await API.get(`/user/${user.id}`);
      setUserData(userData.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    const getAPI = async () => {
      let transaction = await API.get(`/transaction-user/${user.id}`);
      if (transaction.data.status === "transaction data empty") {
        console.log("empty");
      } else {
        setDataTransaction(transaction.data.data.transaction);
        setProducts(transaction.data.data.transaction.products);
        setPage(true);
      }
    };
    getAPI();
  }, []);

  const uploadImage = async (e) => {
    setImgPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);

    const data = new FormData();
    data.append("profpic", e.target.files[0]);
    console.log("data", data);
    console.log("image", e.target.files[0]);
    const config = { headers: { "Content-Type": "multipart/form data" } };

    try {
      await API.patch(`/user/${user.id}`, data, config);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
    // const files = e.target.files
    // const data = new FormData()
    // data.append('file', files[0])
    // data.append('upload_preset', 'satriayud')
    // // setLoading(true)
    // const res = await fetch(
    //     'https://api.cloudinary.com/v1_1/satria-img/image/upload',
    //     {
    //         method: 'POST',
    //         body: data
    //     }
    // )
    // const file = await res.json()
    // setImage(file.secure_url)
    // // setLoading(false)
    // console.log("result user id", user.id)
    // axios({
    //     method: 'patch',
    //     url: `http://localhost:3000/users/${user.id}`,
    //     data: {
    //         profpic: file.secure_url
    //     }
    // })
  };

  const handleConfirm = async (id) => {
    const data = { status: "completed" };
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

  return !products && !page ? (
    <h1>Loading...</h1>
  ) : (
    <Container fluid>
      <HeaderLogin />
      <Row className="top-profile">
        <Col className="my-profile">My Profile</Col>
        <Col className="my-transaction">My Transaction</Col>
      </Row>
      <Row className="content-profile">
        <Col className="profile-detail">
          <div>
            <input
              id="upload-img"
              onChange={uploadImage}
              className="file-input-img"
              type="file"
              placeholder="Photo Product"
            />
            <label for="upload-img">
              <img
                className="profpic"
                src={
                  !imgPreview
                    ? `http://localhost:3001/uploads/${userData.profpic}`
                    : imgPreview
                }
                alt="Profile Picture"
              />
            </label>
          </div>
          <div className="profile-detail-right">
            <Row className="brown-text">Fullname</Row>
            <Row className="black-text">{userData.fullname}</Row>
            <Gap height={27} />
            <Row className="brown-text">Email</Row>
            <Row className="black-text">{userData.email}</Row>
          </div>
        </Col>
        <Col className="my-trans-wrapper">
          <Row>
            <Col sm={9} className="my-trans-left-container">
              {products.map((product, index) => {
                return (
                  <ProductTransaction
                    key={index}
                    id={product.id}
                    name={product.name}
                    photo={product.photo}
                    price={product.price}
                    topings={product.topings}
                  />
                );
              })}
            </Col>
            <Col sm={3} className="my-trans-right-container">
              <Row>
                <img
                  className="logo-trans-qr"
                  src={Logo}
                  alt="logo waysbucks"
                />
              </Row>
              <Row>
                <img className="qr-trans" src={QR} alt="QR Code" />
              </Row>
              <Row className="qr-otw">{dataTransaction.status}</Row>
              <Row className="qr-price">
                Sub Total :{" "}
                <NumberFormat
                  value={dataTransaction.income}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Rp, "}
                  renderText={(value) => <span>{value}</span>}
                />
              </Row>
              {dataTransaction.status === "on the way" ? (
                <Row className="arrival-confirmation">
                  <ButtonOptionConfirm
                    onClick={() => setConfirmShow(true)}
                    title="arrival confirmation"
                  />
                </Row>
              ) : null}
            </Col>
          </Row>
        </Col>
      </Row>
      <Modal
        size="lg"
        show={confirmShow}
        onHide={() => setConfirmShow(false)}
        dialogClassName="modal-container-all"
        centered
      >
        <Modal.Body className="modal-container-profile">
          <Row>
            <h3 className="order-status-confirm">Has your order arrived ?</h3>
          </Row>
          <Row>
            <Col>
              <ButtonOptionApprove
                onClick={() => handleConfirm(dataTransaction.id)}
                className="btn-opt-approve"
                title="Yes"
              />
            </Col>
            <Col>
              <ButtonOption
                onClick={() => setConfirmShow(false)}
                className="btn-opt-cancel"
                title="Not Yet"
              />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default MyProfile;
