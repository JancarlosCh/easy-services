import React, { createContext, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [records, setRecords] = useState([]);

  return (
    <DataContext.Provider value={{ records, setRecords }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider };
export default DataContext;
