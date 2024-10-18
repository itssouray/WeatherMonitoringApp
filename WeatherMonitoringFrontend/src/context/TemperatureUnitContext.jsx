import React, { createContext, useContext, useState } from "react";

const TemperatureUnitContext = createContext();


export const TemperatureUnitProvider = ({ children }) => {
  const [tempUnit, setTempUnit] = useState("Celsius"); 

  return (
    <TemperatureUnitContext.Provider value={{ tempUnit, setTempUnit }}>
      {children}
    </TemperatureUnitContext.Provider>
  );
};


export const useTemperatureUnit = () => {
  return useContext(TemperatureUnitContext);
};
