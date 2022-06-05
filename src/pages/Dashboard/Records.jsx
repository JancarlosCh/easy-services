import React, { useContext, useEffect, useState } from "react";
import ServiceTable from "../../components/ServiceTable";
import ServiceRequestModalForm from "../../components/ServiceRequestModalForm";
import DataContext from "../../context/DataContext";

const Records = () => {
  const [service, setService] = useState(null);
  const [show, setShow] = useState(false);
  const { records } = useContext(DataContext);

  const [filteredData, setFilterdedData] = useState(null);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setService(null);
    setShow(false);
  };

  useEffect(() => {
    setFilterdedData(
      () => records.filter((rec) => rec.record_id === service)[0]
    );
  }, [service]);

  return (
    <>
      <ServiceTable handleShow={handleShow} setService={setService} />
      <ServiceRequestModalForm
        showModal={show}
        handleClose={handleClose}
        service={service}
        filteredData={filteredData}
      />
    </>
  );
};

export default Records;
