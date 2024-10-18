import React, { useState, useEffect } from "react";
import AlertThresholds from "../components/AlertThreshold";
import { getWeatherData } from "../Services/WeatherApi";
import {
  getThresholdsFromCookie,
} from "../utils/threshold";

const WeatherAlerting = () => {
  const [thresholds, setThresholds] = useState(getThresholdsFromCookie());
  const [weatherData, setWeatherData] = useState(null); 
  const [prevWeatherData, setPrevWeatherData] = useState(null); 
  const [alert, setAlert] = useState(null); 
  const [selectedCity, setSelectedCity] = useState("Delhi");

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeatherData(selectedCity);

      setPrevWeatherData(weatherData); 
      setWeatherData(data); 
    };

   
    fetchWeather();

    
    const interval = setInterval(() => {
      fetchWeather(); 
    }, 60000); 

    return () => clearInterval(interval);
  }, [selectedCity]);

  useEffect(() => {
    if (weatherData && prevWeatherData && thresholds) {
      checkForConsecutiveAlert(weatherData, prevWeatherData, thresholds);
    }
  }, [weatherData, prevWeatherData, thresholds]);

  const checkForConsecutiveAlert = (currentData, previousData, thresholds) => {
    const { temp: currentTemp } = currentData.main;
    const currentCondition = currentData.weather[0].main;

    const { temp: previousTemp } = previousData?.main || {};
    const previousCondition = previousData?.weather?.[0]?.main || "";
    console.log("prev temp : ", previousTemp);
    console.log("currect temp : ", currentTemp);
    
    const tempAlert =
      currentTemp >= thresholds.tempThreshold &&
      previousTemp >= thresholds.tempThreshold;

    
    const conditionAlert =
      currentCondition === thresholds.conditionThreshold &&
      previousCondition === thresholds.conditionThreshold;

    if (tempAlert) {
      setAlert(
        `Alert! Temperature in ${selectedCity} has exceeded ${thresholds.tempThreshold}°C for two consecutive updates.`
      );
    } else if (conditionAlert) {
      setAlert(
        `Alert! Weather condition in ${selectedCity} is now ${thresholds.conditionThreshold} for two consecutive updates.`
      );
    } else {
      setAlert(null);
    }
  };

  return (
    <div>
      {alert && (
        <div className="bg-red-500 text-white p-4 mt-4 rounded-lg">
          <h2 className="font-bold">{alert}</h2>
        </div>
      )}
      <div className="bg-green-600 text-white shadow-md rounded-lg p-4 mt-4">
        <h2 className="text-lg font-semibold mb-2">
          Current Alert Thresholds:
        </h2>
        <div className="flex items-center gap-12">
          <p>Temperature Threshold: 
            <span className="">   {thresholds.tempThreshold}°C</span>
            </p>
          <p>Weather Condition Threshold:  {thresholds.conditionThreshold}</p>
        </div>
      </div>
     
      <div className="bg-white shadow-md rounded-lg p-4 mt-4">
        <div className="w-1/2">
          <label className="block text-lg font-semibold mb-2">
            Select City:
          </label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="border rounded p-2 w-full"
          >
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Hyderabad">Hyderabad</option>
            
          </select>
        </div>
      </div>

      <AlertThresholds onThresholdSet={setThresholds} />

      
      {weatherData && (
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
          <h2 className="text-xl font-semibold">
            Current Weather in {selectedCity}
          </h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Condition: {weatherData.weather[0].main}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherAlerting;
