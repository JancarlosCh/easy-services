import React, { useContext } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormSelect,
} from "react-bootstrap";

import { useForm } from "react-hook-form";
import AuthContext from "../context/AuthContext";
import { database } from "../services/firebase";

const ServiceRequestForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { auth } = useContext(AuthContext);

  const { insertRecord } = database();

  const onSubmit = async (data) => {
    const fecha = new Date();
    const day = fecha.getDate();
    const month = fecha.getMonth() + 1;
    const year = fecha.getFullYear();
    const date = `${day}/${month}/${year}`;

    insertRecord({ ...data, user_id: auth.uid, created_at: date });

    reset(
      {
        category: "",
        type: "",
        description: "",
        on_site_service: "",
      },
      {
        keepErrors: true,
        keepDirty: true,
        keepIsSubmitted: false,
        keepTouched: false,
        keepIsValid: false,
        keepSubmitCount: false,
      }
    );
  };

  const categories = [
    "Mantenimieto Inmuebles",
    "Mantenimieto Muebles",
    "Servicios",
  ];

  const types = {
    Inmuebles: ["Cielo Raso", "Eléctrico", "Pared", "Puerta"],
    Muebles: ["Aire acondicionado", "Archivador", "Puesto de trabajo", "Silla"],
    Servicios: ["Aseo", "Transporte", "Vigilancia"],
  };

  return (
    <Container className="d-flex flex-column pt-3">
      <div className="align-self-center mb-3">
        <h1>Solicitar Servicios</h1>
      </div>
      <Form
        className="w-50 align-self-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-3">
          <FloatingLabel label="Categoría:">
            <FormSelect
              aria-label="Default select example"
              {...register("category", {
                required: {
                  value: true,
                  message: "Debes seleccionar una categoría",
                },
              })}
            >
              <option value="">Seleccionar</option>
              {categories.map((category, i) => (
                <option key={i} value={category}>
                  {category}
                </option>
              ))}
            </FormSelect>
          </FloatingLabel>
          {errors.category && (
            <div className="text-danger">{errors.category.message}</div>
          )}
        </div>
        <div className="mb-3">
          <FloatingLabel label="Tipo:">
            <FormSelect
              aria-label="Default select example"
              disabled={watch("category") == "Seleccionar"}
              {...register("type", {
                required: {
                  value: true,
                  message: "Debes seleccionar un servicio",
                },
              })}
            >
              <option value="">Seleccionar</option>
              {watch("category") == categories[0] &&
                types.Inmuebles.map((type, i) => (
                  <option key={i}>{type}</option>
                ))}

              {watch("category") == categories[1] &&
                types.Muebles.map((type, i) => <option key={i}>{type}</option>)}

              {watch("category") == categories[2] &&
                types.Servicios.map((type, i) => (
                  <option key={i}>{type}</option>
                ))}
            </FormSelect>
          </FloatingLabel>
          {errors.type && (
            <div className="text-danger">{errors.type.message}</div>
          )}
        </div>
        <div className="mb-3">
          <FloatingLabel controlId="description" label="Descripción">
            <FormControl
              as="textarea"
              name="descrición"
              placeholder="Leave a comment here"
              style={{ height: "100px", resize: "none" }}
              {...register("description", {
                required: {
                  value: true,
                  message: "Debes seleccionar ingresar una descripción",
                },
              })}
            ></FormControl>
          </FloatingLabel>
          {errors.description && (
            <div className="text-danger">{errors.description.message}</div>
          )}
        </div>
        <div className="mb-3">
          <FloatingLabel controlId="place" label="¿Donde se llevará a cabo?">
            <FormControl
              type="text"
              placeholder="Lugar de la empresa"
              {...register("on_site_service", {
                required: {
                  value: true,
                  message: "Debes seleccionar ingresar un lugar",
                },
              })}
            ></FormControl>
          </FloatingLabel>
          {errors.on_site_service && (
            <div className="text-danger">{errors.on_site_service.message}</div>
          )}
        </div>
        <div className="d-grid gap-2 mt-3">
          <Button variant="dark" type="submit">
            Guardar
          </Button>
          <Button variant="danger">Cancelar</Button>
        </div>
      </Form>
    </Container>
  );
};

export default ServiceRequestForm;
