import React from "react";
import { Container } from "react-bootstrap";
import About from "../../components/About";
import Header from "../../components/Header";

const Home = () => {
  return (
    <Container fluid className="h-100 p-0">
      <Header />
      <About />
    </Container>
  );
};

export default Home;
