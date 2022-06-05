import React, { useContext } from "react";
import {
  Container,
  FloatingLabel,
  Form,
  FormControl,
  FormSelect,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import DataContext from "../context/DataContext";
import { database } from "../services/firebase";

const ServiceRequestModalForm = ({
  showModal,
  handleClose,
  service,
  filteredData,
}) => {
  const { updateRecord } = database();
  const { records, setRecords } = useContext(DataContext);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const rec = records.filter((r) => r.record_id == service);

    const { created_at } = rec[0].data;

    var newData = { ...data, id: service, created_at };
    updateRecord(newData);

    newData = {
      record_id: service,
      data: { ...data, id: service, created_at },
    };

    const rec2 = records.filter((r) => r.record_id != service);
    rec2.push(newData);

    setRecords(rec2);

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

    handleClose();
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
    <>
      <Modal show={showModal}>
        <ModalHeader>
          <ModalTitle>Editar registro</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Container>
            <Form className="w-100" onSubmit={handleSubmit(onSubmit)}>
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
                      types.Muebles.map((type, i) => (
                        <option key={i}>{type}</option>
                      ))}

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
                  <div className="text-danger">
                    {errors.description.message}
                  </div>
                )}
              </div>
              <div className="mb-3">
                <FloatingLabel
                  controlId="place"
                  label="¿Donde se llevará a cabo?"
                >
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
                  <div className="text-danger">
                    {errors.on_site_service.message}
                  </div>
                )}
              </div>
              <div className="d-grid gap-2 mt-3">
                <Button variant="dark" type="submit">
                  Actualizar
                </Button>
                <Button variant="danger" onClick={handleClose}>
                  Cancelar
                </Button>
              </div>
            </Form>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ServiceRequestModalForm;
