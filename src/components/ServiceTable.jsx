import React, { useContext, useEffect } from "react";
import DataContext from "../context/DataContext";
import { database } from "../services/firebase";

import { Container, Table } from "react-bootstrap";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import AuthContext from "../context/AuthContext";

const ServiceTable = ({ handleShow, setService }) => {
  const { auth } = useContext(AuthContext);
  const { records, setRecords } = useContext(DataContext);

  const { getRecords } = database();

  useEffect(() => {
    getRecords(auth.uid)
      .then((data) => setRecords(data))
      .catch((error) => console.log(error));
  }, []);
  
  return (
    <Container className="mt-5">
      <Table striped hover responsive>
        <caption>Lista de solicitudes</caption>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>categoría</th>
            <th>tipo</th>
            <th>descripción</th>
            <th>on-site service</th>
            <th>created_at</th>
            <th className="text-center">acciones</th>
          </tr>
        </thead>
        <tbody className="table-primary">
          {records &&
            records.map(({ record_id, data }, i) => {
              {
                const {
                  category,
                  type,
                  description,
                  on_site_service,
                  created_at,
                } = data;
                return (
                  <tr key={record_id}>
                    <td>{i}</td>
                    <td>{category}</td>
                    <td>{type}</td>
                    <td>{description}</td>
                    <td>{on_site_service}</td>
                    <td>{created_at}</td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <EditButton
                          showModal={handleShow}
                          service={record_id}
                          setService={setService}
                        />
                        <DeleteButton
                          service={record_id}
                          setService={setService}
                        />
                      </div>
                    </td>
                  </tr>
                );
              }
            })}
        </tbody>
      </Table>
    </Container>
  );
};

export default ServiceTable;
