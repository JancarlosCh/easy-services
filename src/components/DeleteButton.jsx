import React, { useContext } from "react";
import { Button } from "react-bootstrap";
import DataContext from "../context/DataContext";
import { database } from "../services/firebase";

const DeleteButton = ({ setService, service }) => {
  const { records, setRecords } = useContext(DataContext);

  const { deleteRecord } = database();

  const handleDelete = () => {
    const data = records.filter((record) => {
      return record.record_id != service && record
    });
    deleteRecord(service);
    setRecords(data)
  };

  return (
    <>
      <Button variant="danger" className="px-2" onClick={handleDelete}>
        Eliminar
      </Button>
    </>
  );
};

export default DeleteButton;
