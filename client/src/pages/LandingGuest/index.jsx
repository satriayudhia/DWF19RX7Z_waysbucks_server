import React, { useState, useContext } from "react";
import { AppContext } from "../../config/Context";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikControl from "../../config/FormikControl";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Content from "../../components/molecules/Content";
import "./LandingGuest.scss";
import { ReactComponent as Logo } from "../../assets/logos/Logo.svg";
import ButtonLandingLogin from "../../components/atoms/ButtonLandingLogin";
import ButtonLandingRegister from "../../components/atoms/ButtonLandingRegister";
import Gap from "../../components/atoms/Gap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "../../components/atoms/Button";
import Alert from "react-bootstrap/Alert";
import { API, setAuthToken } from "../../config/API";

const LandingGuest = () => {
  //Context
  const [state, dispatch] = useContext(AppContext);
  //Modal
  const [loginShow, setLoginShow] = useState(false);
  const [registerShow, setRegisterShow] = useState(false);
  //Alert
  const [alertShow, setAlertShow] = useState(false);
  const [alertReg, setAlertReg] = useState(false);
  const [successShow, setSuccessShow] = useState(false);
  //Initial State Login Formik
  const initialValuesLogin = {
    email: "",
    password: "",
  };
  //Initial State Register Formik
  const initialValuesRegister = {
    email: "",
    password: "",
    fullname: "",
  };

  const router = useHistory();

  //Schema validation form for login
  const validationSchemaLogin = Yup.object({
    email: Yup.string().email("Invalid email format").required("required"),
    password: Yup.string().required("Required"),
  });

  //Schema validation form for register
  const validationSchemaRegister = Yup.object({
    email: Yup.string().email("Invalid email format").required("required"),
    password: Yup.string()
      .min(8, "Minimum password is 8 characters")
      .required("Required"),
    fullname: Yup.string()
      .min(3, "Minimum fullname is 3 characters")
      .required("Required"),
  });

  //Submit login handling
  const handleSubmitLogin = async (values) => {
    try {
      const data = JSON.stringify({
        email: values.email,
        password: values.password,
      });
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await API.post("/login", data, config);

      console.log("response", response)

      if (response.status == 200 && response.data.data.isAdmin == "false") {
        setAlertShow(false);
        dispatch({
          type: "LOGIN",
          payload: response.data.data,
        });
        router.push("/home");
        setAuthToken(response.data.data.token);
      } else if (response.status == 200 && response.data.data.isAdmin == "true") {
        setAlertShow(false);
        dispatch({
          type: "LOGIN",
          payload: response.data.data,
        });
        setAuthToken(response.data.data.token);
        router.push("/admin");
      }
    } catch (error) {
      console.log("Error Result :", error);
      setAlertShow(true);
    }
  };

  //Submit register handling
  const handleSubmitRegister = async (values) => {
    try {
      const data = JSON.stringify({
        email: values.email,
        password: values.password,
        fullname: values.fullname,
        profpic: "no-profpic.png",
        status: "active",
        isAdmin: false,
      });
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await API.post("/register", data, config);
      if (response.status === 200) {
        setAlertReg(false);
        setSuccessShow(true);
      }
    } catch (error) {
      console.log("Error Result :", error);
      setAlertReg(true);
    }
  };

  const toLoginShow = () => {
    setRegisterShow(false);
    setLoginShow(true);
    setAlertShow(false);
    setSuccessShow(false);
  };

  const toRegisterShow = () => {
    setRegisterShow(true);
    setLoginShow(false);
  };

  return (
    <Container fluid>
      <Row>
        <Col className="logo-header-guest">
          <Logo />
        </Col>
        <Col className="button-header-guest">
          <ButtonLandingLogin
            onClick={() => setLoginShow(true)}
            title="Login"
          />
          <ButtonLandingRegister
            onClick={() => setRegisterShow(true)}
            title="Register"
          />
        </Col>
      </Row>
      <Row>
        <Col className="content-guest">
          <Content />
        </Col>
      </Row>
      <Modal
        size="lg"
        show={loginShow}
        onHide={() => setLoginShow(false)}
        centered
        dialogClassName="modal-login"
      >
        <Modal.Body className="modal-container">
          <div className="login-wrapper">
            <button
              type="button"
              className="close"
              onClick={() => setLoginShow(false)}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <Formik
              initialValues={initialValuesLogin}
              validationSchema={validationSchemaLogin}
              onSubmit={(e) => handleSubmitLogin(e)}
            >
              {(formik) => {
                return (
                  <Form>
                    <p className="title-login">Login</p>
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
                      placeholder="Password"
                      control="input"
                      type="password"
                      name="password"
                    />
                    {alertShow && (
                      <Alert
                        className="alert-log"
                        variant="danger"
                        onClose={() => setAlertShow(false)}
                      >
                        Your email or password is incorrect !
                      </Alert>
                    )}
                    <Gap height={29} />
                    <Button
                      title="Login"
                      type="submit"
                      disabled={!formik.isValid}
                    />
                    <p className="to-register">
                      Don't have an account ? Click{" "}
                      <strong
                        className="cursor-pointer"
                        onClick={toRegisterShow}
                      >
                        Here
                      </strong>
                    </p>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        show={registerShow}
        onHide={() => setRegisterShow(false)}
        centered
        dialogClassName="modal-register"
      >
        <Modal.Body className="modal-container">
          <div className="register-wrapper">
            <button
              type="button"
              className="close"
              onClick={() => setRegisterShow(false)}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
            <Formik
              initialValues={initialValuesRegister}
              validationSchema={validationSchemaRegister}
              onSubmit={(e) => handleSubmitRegister(e)}
            >
              {(formik) => {
                return (
                  <Form>
                    <p className="title-register">Register</p>
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
                      placeholder="Password"
                      control="input"
                      type="password"
                      name="password"
                    />
                    <Gap height={20} />
                    <FormikControl
                      className="form-input"
                      placeholder="Fullname"
                      control="input"
                      type="text"
                      name="fullname"
                    />
                    {alertReg && (
                      <Alert
                        className="alert-log"
                        variant="danger"
                        onClose={() => setAlertReg(false)}
                      >
                        Your email already registered
                      </Alert>
                    )}
                    {successShow && (
                      <Alert
                        className="alert-log"
                        variant="success"
                        onClose={() => setSuccessShow(false)}
                      >
                        Your account successfully registered, Please{" "}
                        <strong
                          className="cursor-pointer"
                          onClick={toLoginShow}
                        >
                          login
                        </strong>{" "}
                        to continue
                      </Alert>
                    )}
                    <Gap height={29} />
                    <Button
                      title="Register"
                      type="submit"
                      disabled={!formik.isValid}
                    />
                    <p className="to-login">
                      Already have an account ? Click{" "}
                      <strong className="cursor-pointer" onClick={toLoginShow}>
                        Here
                      </strong>
                    </p>
                  </Form>
                );
              }}
            </Formik>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default LandingGuest;
