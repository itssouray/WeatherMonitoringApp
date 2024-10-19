import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import WeatherCard from '../components/WeatherCard';
import getStoredWeatherData from '../Services/getStoredWeatherData';

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const cities = ['Delhi', 'Mumbai', 'Chennai', 'Bangalore', 'Kolkata', 'Hyderabad'];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const dataPromises = cities.map(city => getStoredWeatherData(city));
        const results = await Promise.all(dataPromises);

        const formattedData = results.map((dataEntries, index) => {
          if (!dataEntries || dataEntries.length === 0) {
            return {
              city: cities[index],
              currentWeather: {
                temp: 'N/A', 
                condition: 'N/A', 
              },
            };
          }

          const latestEntry = dataEntries[dataEntries.length - 1];
          const latestReading = latestEntry.readings[latestEntry.readings.length - 1];

          return {
            city: cities[index],
            currentWeather: {
              temp: latestReading.temp,
              condition: latestReading.condition, 
            },
          };
        });
        
        setWeatherData(formattedData); 
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchWeatherData();
  }, []);

  const handleCardClick = (cityName) => {
    navigate(`/city/${cityName}`); 
  };

  return (
    <div className="weather-dashboard">
      {loading ? (
       
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          <span className="ml-2 text-lg text-gray-700 dark:text-gray-300"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {weatherData.map((data, index) => (
            <WeatherCard 
              key={index} 
              cityData={data.currentWeather} 
              cityName={data.city} 
              onCardClick={() => handleCardClick(data.city)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
