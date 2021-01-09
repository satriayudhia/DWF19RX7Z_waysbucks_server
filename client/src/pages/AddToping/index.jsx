import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import FormikControl from "../../config/FormikControl";
import * as Yup from "yup";
import Gap from "../../components/atoms/Gap";
import Alert from "react-bootstrap/Alert";
import Modal from "react-bootstrap/Modal";
import "./AddToping.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HeaderAdmin from "../../components/molecules/HeaderAdmin";
import Button from "../../components/atoms/Button";
import Clip from "../../assets/logos/clip.png";
import { API } from "../../config/API";

const AddToping = () => {
  //Default Image
  const [photo, setPhoto] = useState(
    "https://www.brdtex.com/wp-content/uploads/2019/09/no-image.png"
  );

  //State
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({});
  const [imgPreview, setImgPreview] = useState("");

  //Modal
  const [productStatus, setProductStatus] = useState(false);

  //Alert
  const [alertShow, setAlertShow] = useState(false);

  //Initial State Formik
  const initialValues = {
    name: "",
    price: "",
  };

  //Schema validation form
  const validationSchema = Yup.object({
    name: Yup.string().required("required"),
    price: Yup.number().required("Required"),
  });

  const router = useHistory();

  const handleFileUpload = (e) => {
    setImage(e.target.files[0]);
    setImgPreview(URL.createObjectURL(e.target.files[0]));
  };

  const timeout = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const handleSubmit = async (e) => {
    const config = { headers: { "Content-Type": "multipart/form data" } };
    const data = new FormData();
    data.append("name", e.name);
    data.append("price", e.price);
    data.append("photo", image);

    try {
      await API.post("/toping", data, config);
      setAlertShow(false);
      setProductStatus(true);
      await timeout(3000);
      hideProductStatus();
    } catch (error) {
      console.log(error);
      setAlertShow(true);
    }
  };

  const hideProductStatus = () => {
    setProductStatus(false);
    router.push("/admin");
  };

  return (
    <Container fluid>
      <HeaderAdmin />
      <Row className="form-toping-wrapper">
        <Col>
          <Row className="form-header-toping">Toping</Row>
          <Row>
            <Col>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(e) => handleSubmit(e)}
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
                        placeholder="Price"
                        control="input"
                        type="number"
                        name="price"
                      />
                      <Gap height={20} />
                      <input
                        id="photo"
                        name="photo"
                        accept="image/*"
                        type="file"
                        onChange={handleFileUpload}
                        style={{ display: "none" }}
                      />
                      <label className="attach-photo" for="photo">
                        <img src={Clip} alt="upload image" />
                      </label>
                      <Gap height={20} />
                      {alertShow && (
                        <Alert
                          className="alert-log"
                          variant="danger"
                          onClose={() => setAlertShow(false)}
                        >
                          Please upload image of product
                        </Alert>
                      )}
                      <Button
                        title="Submit"
                        type="submit"
                        disabled={!formik.isValid}
                      />
                    </Form>
                  );
                }}
              </Formik>
            </Col>
          </Row>
        </Col>
        <Col className="img-toping-wrapper">
          {loading ? (
            <h3 className="uploading">Uploading...</h3>
          ) : (
            <img
              className="img-add-toping"
              src={!imgPreview ? photo : imgPreview}
              alt="image toping"
            />
          )}
        </Col>
      </Row>
      <Modal
        size="lg"
        show={productStatus}
        onHide={() => hideProductStatus()}
        centered
      >
        <Modal.Body className="text-center">
          <p className="order-status">Toping successfully added</p>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AddToping;
