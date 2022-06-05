import React, { useState } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormControl,
} from "react-bootstrap";

import { LinkContainer } from "react-router-bootstrap";

import { useForm } from "react-hook-form";

import { authentication } from "../services/auth";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formError, setFormError] = useState(null);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const { registerWithEmail } = authentication();

  const onSubmit = (data) => {
    registerWithEmail(data)
      .then((response) => {
        setFormError(null);
        navigate("/login")
        console.log(response);
      })
      .catch((error) => {
        setFormError(error.code);
        console.log(error.code);
      });
  };

  return (
    <Container className="d-flex flex-column mt-5 p-5">
      <div className="align-self-center mb-3">
        <h1>Registro de usuarios</h1>
      </div>
      {formError && <div className="text-center text-danger">{formError}</div>}
      <Form
        className="w-50 align-self-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-3">
          <FloatingLabel controlId="email" label="Ingresa tu correo">
            <FormControl
              type="text"
              placeholder="Ingresa tu correo"
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
            {errors.email && (
              <div className="text-danger">{errors.email.message}</div>
            )}
          </FloatingLabel>
        </div>
        <div className="mb-3">
          <FloatingLabel controlId="password" label="Ingresa tu contraseña">
            <FormControl
              type="password"
              placeholder="Ingresa tu contraseña"
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
            {errors.password && (
              <div className="text-danger">{errors.password.message}</div>
            )}
          </FloatingLabel>
        </div>
        <div className="d-grid mb-3 gap-3">
          <Button variant="dark" type="submit">
            Registrarse
          </Button>
          <LinkContainer to="/login">
            <Button variant="link">¿Ya tienes cuenta?</Button>
          </LinkContainer>
        </div>
      </Form>
    </Container>
  );
};

export default RegistrationForm;
