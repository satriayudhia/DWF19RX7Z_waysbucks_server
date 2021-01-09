import React, { useContext } from "react";
import { AppContext } from "../../../config/Context";
import { useHistory } from "react-router-dom";
import "./HeaderAdmin.scss";
import { ReactComponent as Logo } from "../../../assets/logos/Logo.svg";
import { ReactComponent as Avatar } from "../../../assets/avatar/avatar.svg";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { ReactComponent as AddProductBtn } from "../../../assets/logos/addProductBtn.svg";
import { ReactComponent as LogoutBtn } from "../../../assets/logos/logoutBtn.svg";
import { ReactComponent as AddToping } from "../../../assets/logos/addToping.svg";

const HeaderAdmin = () => {
  //Context
  const [state, dispatch] = useContext(AppContext);

  const router = useHistory();

  const toHome = () => {
    router.push("/admin");
  };
  const toAddProduct = () => {
    router.push("/add-product");
  };
  const toAddToping = () => {
    router.push("/add-toping");
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
        <Col className="logo-header">
          <Logo className="logo-header-cursor" onClick={toHome} />
        </Col>
        <Col className="profile-headers">
          <OverlayTrigger
            trigger="click"
            key="bottom"
            placement="bottom"
            overlay={
              <Popover id={"popover-positioned-bottom"}>
                <Popover.Content>
                  <AddProductBtn
                    onClick={toAddProduct}
                    style={{ width: "60%", cursor: "pointer" }}
                  />
                </Popover.Content>
                <Popover.Content>
                  <AddToping
                    onClick={toAddToping}
                    style={{ width: "56%", cursor: "pointer" }}
                  />
                </Popover.Content>
                <Popover.Content>
                  <LogoutBtn
                    onClick={toLogin}
                    style={{ width: "44%", cursor: "pointer" }}
                  />
                </Popover.Content>
              </Popover>
            }
          >
            <Avatar className="avatar-header" />
          </OverlayTrigger>
        </Col>
      </Row>
    </Container>
  );
};

export default HeaderAdmin;
