import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../../../config/Context";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./HeaderLogin.scss";
import { ReactComponent as Logo } from "../../../assets/logos/Logo.svg";
import { ReactComponent as Avatar } from "../../../assets/avatar/avatar.svg";
import { ReactComponent as Cart } from "../../../assets/logos/cart.svg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { ReactComponent as ProfileBtn } from "../../../assets/logos/profile-btn.svg";
import { ReactComponent as LogoutBtn } from "../../../assets/logos/logoutBtn.svg";
import { API } from "../../../config/API";

const HeaderLogin = () => {
  //Get UserInfo
  const user = JSON.parse(localStorage.getItem("userInfo"));
  //Context
  const [state, dispatch] = useContext(AppContext);

  const [cartCount, setCartCount] = useState(0);

  const [userData, setUserData] = useState({});

  const router = useHistory();

  const getUser = async () => {
    try {
      const userData = await API.get(`/user/${user.id}`);
      setUserData(userData.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const getCart = async () => {
    let transaction = await API.get(`/transaction-user/${user.id}`);
    if (transaction.data.status === "transaction data empty") {
      console.log("empty");
    } else {
      setCartCount(transaction.data.data.transaction.products.length);
    }
  };

  useEffect(() => {
    getUser();
    getCart();
  }, []);

  const toHome = () => {
    router.push("/home");
  };
  const toCart = () => {
    router.push("/cart");
  };
  const toProfile = () => {
    router.push("/profile");
  };
  const toLogin = () => {
    dispatch({
      type: "LOGOUT",
    });
    router.push("/");
  };

  return (
    <Container fluid>
      <Row>
        <Col className="logo-header-login">
          <Logo className="logo-header-cursor" onClick={toHome} />
        </Col>
        <Col className="profile-header">
          <Row>
            <Col className="profile-header-right">
              <Cart className="cart-header" onClick={toCart} />
              {cartCount == 0 ? <p></p> : <p className="notif">{cartCount}</p>}
              <OverlayTrigger
                trigger="click"
                key="bottom"
                placement="bottom"
                overlay={
                  <Popover id={"popover-positioned-bottom"}>
                    <Popover.Content>
                      <ProfileBtn
                        onClick={toProfile}
                        style={{ width: "60%", cursor: "pointer" }}
                      />
                    </Popover.Content>
                    <Popover.Content>
                      <LogoutBtn
                        onClick={toLogin}
                        style={{ width: "60%", cursor: "pointer" }}
                      />
                    </Popover.Content>
                  </Popover>
                }
              >
                <img
                  src={`http://localhost:3001/uploads/${userData.profpic}`}
                  className="avatar-header-login"
                />
                {/* <Avatar className="avatar-header" /> */}
              </OverlayTrigger>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default HeaderLogin;
