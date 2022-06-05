import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import bg from "../assets/img/intro-bg.jpg";

const Header = () => {
  return (
    <div className="intro-body mb-5">
      <header className="masthead pt-5" style={{ backgroundImage: `url(${bg})` }}>
        <Container>
          <Row>
            <Col className="col-lg-8 mx-auto">
              <h1 className="text-center">grayscale</h1>
              <p>
                A free, responsive, one page Bootstrap theme. <br /> Created
                with love.
              </p>
              <a
                className="btn btn-link btn-circle"
                role="button"
                href="#about"
              >
                <i className="fa fa-angle-double-down animated"></i>
              </a>
            </Col>
          </Row>
        </Container>
      </header>
    </div>
  );
};

export default Header;
