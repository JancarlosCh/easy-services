import React, { useContext, useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  NavLink,
} from "react-bootstrap";

import { IndexLinkContainer, LinkContainer } from "react-router-bootstrap";

import { useForm } from "react-hook-form";

import { authentication } from "../services/auth";
import AuthContext from "../context/AuthContext";
import { setIsLogged } from "../services/localStorage";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formError, setFormError] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //console.log(watch("email")); // watch input value by passing the name of it
  const { auth, setAuth } = useContext(AuthContext);

  const { loginWithEmail } = authentication();

  const navigate = useNavigate()

  const onSubmit = (data) => {
    loginWithEmail(data)
      .then((response) => {
        setFormError(null);
        const { uid, accessToken } = response.user;
        const authData = { uid, accessToken, isLogged: true };
        setAuth(authData);
        console.log(authData)
        setIsLogged(JSON.stringify(authData));
        navigate("/consultas")
      })
      .catch((error) => {
        setFormError(error.code);
        console.log(error.code);
      });
  };

  return (
    <Container className="d-flex flex-column mt-5 p-5">
      <div className="align-self-center mb-3">
        <h1>Inicio de sesión</h1>
      </div>
      {formError && <div className="text-center text-danger">{formError}</div>}
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="w-50 align-self-center"
      >
        <div className="mb-3">
          <FloatingLabel controlId="email" label="Correo">
            <FormControl
              type="text"
              placeholder="Correo"
              defaultValue=""
              {...register("email", {
                required: {
                  value: true,
                  message: "Debes ingresar tu E-mail",
                },
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "Formato de E-mail no válido",
                },
              })}
            />
          </FloatingLabel>
          {errors.email && (
            <div className="text-danger">{errors.email.message}</div>
          )}
        </div>
        <div className="mb-3">
          <FloatingLabel controlId="password" label="Contraseña">
            <FormControl
              type="password"
              placeholder="Contraseña"
              defaultValue=""
              {...register("password", {
                required: {
                  value: true,
                  message: "Debes ingresar tu contraseña",
                },
                pattern: {
                  value: /^.{4,12}$/,
                  message:
                    "La contraseña debe contener entre 4 y 12 caracteres",
                },
              })}
            />
          </FloatingLabel>
          {errors.password && (
            <div className="text-danger">{errors.password.message}</div>
          )}
        </div>
        <div className="d-grid mb-3 gap-3">
          <Button variant="dark" type="submit">
            Acceder
          </Button>
          <LinkContainer to="/register">
            <Button variant="link">¿No tienes cuenta?</Button>
          </LinkContainer>
        </div>
      </Form>
    </Container>
  );
};

export default LoginForm;
