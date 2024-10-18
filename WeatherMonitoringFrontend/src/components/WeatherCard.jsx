import React from 'react';
import { useTemperatureUnit } from '../context/TemperatureUnitContext';

const WeatherCard = ({ cityData, cityName, onCardClick }) => {
  const { tempUnit } = useTemperatureUnit(); 

  if (!cityData) return null;

  const { temp, condition } = cityData;

 
  const convertedTemp = tempUnit === "Kelvin" ? (temp + 273.15).toFixed(2) : temp;

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 cursor-pointer" onClick={onCardClick}>
      <h2 className="text-2xl font-semibold">{cityName}</h2>
      <p>Temperature: <span className="font-bold">{convertedTemp} °{tempUnit === 'Kelvin' ? 'K' : 'C'}</span></p>
      <p>Condition: <span className="font-bold">{condition}</span></p>
      
    </div>
  );
};

export default WeatherCard;
