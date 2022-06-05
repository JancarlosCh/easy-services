import React from "react";
import { Button } from "react-bootstrap";

const EditButton = ({ showModal, setService, service }) => {
  const handleClick = () => {
    setService(service)
    showModal()
  };

  return (
    <>
      <Button variant="warning" className="px-3" onClick={handleClick}>
        Editar
      </Button>
    </>
  );
};

export default EditButton;
