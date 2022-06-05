import React, { useContext } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
  NavLink,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import logo from "../assets/img/24-hour-services.svg";
import AuthContext from "../context/AuthContext";
import DataContext from "../context/DataContext";
import { setIsLogged } from "../services/localStorage";

const initialValue = {
  uid: null,
  accessToken: null,
  isLogged: false,
};

const Menu = () => {
  const { auth, setAuth } = useContext(AuthContext);

  const { setRecords } = useContext(DataContext);

  const handleLogout = () => {
    setAuth(initialValue);
    setIsLogged(JSON.stringify({ isLogged: false }));
    setRecords([]);
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Container fluid>
          <NavbarBrand>
            <img src={logo} alt="logo" height="50" /> Easy Services
          </NavbarBrand>
          <Nav className="ms-auto">
            {!auth.isLogged ? (
              <>
                <LinkContainer to="/">
                  <NavLink>Inicio</NavLink>
                </LinkContainer>
                <LinkContainer to="login">
                  <NavLink>Login</NavLink>
                </LinkContainer>
              </>
            ) : (
              <>
                <LinkContainer to="/solicitudes">
                  <NavLink>Solicitudes</NavLink>
                </LinkContainer>
                <LinkContainer to="/consultas">
                  <NavLink>Consultas</NavLink>
                </LinkContainer>
                <Button
                  variant="danger"
                  className="ms-3"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
};

export default Menu;
