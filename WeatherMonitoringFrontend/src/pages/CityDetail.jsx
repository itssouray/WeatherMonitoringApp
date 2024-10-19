import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getStoredWeatherData from "../Services/getStoredWeatherData";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import "chartjs-adapter-date-fns";
import { useTemperatureUnit } from "../context/TemperatureUnitContext";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const CityDetail = () => {
  const { cityName } = useParams();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { tempUnit } = useTemperatureUnit();


  const convertTemperature = (temp, unit) => {
    if (unit === "Kelvin") {
      return temp + 273.15;
    }
    return temp;
  };

 
  useEffect(() => {
    const fetchWeatherDataFromBackend = async () => {
      setLoading(true);
      setError(null);

      try {
        const storedWeatherData = await getStoredWeatherData(cityName);

        if (storedWeatherData && storedWeatherData.length > 0) {
          
          const latestData = storedWeatherData[storedWeatherData.length - 1];
          const latestReading =
            latestData.readings[latestData.readings.length - 1];

          setCurrentWeather({
            temp: convertTemperature(latestReading.temp, tempUnit),
            condition: latestReading.condition,
          });

          
          const historical = storedWeatherData.map((entry) => ({
            date: entry.date,
            temperatures: entry.readings.map((r) => ({
              temp: convertTemperature(r.temp, tempUnit),
              timestamp: r.timestamp,
            })),
          }));

          setHistoricalData(historical);
        }
      } catch (error) {
        setError("Error fetching weather data");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherDataFromBackend();
  }, [cityName, tempUnit]);


  const groupByDate = (data) => {
    const groupedData = {};

    data.forEach((entry) => {
      const date = new Date(entry.date).toLocaleDateString();
      if (!groupedData[date]) {
        
        groupedData[date] = entry.temperatures[0].temp;
      }
    });

    return groupedData;
  };

  
  const prepareChartData = () => {
    if (!historicalData || historicalData.length === 0) return null;

    const groupedData = groupByDate(historicalData);

    const labels = Object.keys(groupedData); 
    const data = Object.values(groupedData); 

    
    if (data.length === 1) {
      labels.push(labels[0]);
      data.push(data[0]);
    }

    return {
      labels,
      datasets: [
        {
          label: `Temperature (°${tempUnit === "Kelvin" ? "K" : "C"})`,
          data,
          borderColor: "rgba(75, 192, 192, 1)",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          fill: true,
        },
      ],
    };
  };

  const chartData = prepareChartData();

  
  const calculateDailySummary = () => {
    if (!historicalData || historicalData.length === 0) return null;

    let totalTemp = 0;
    let maxTemp = -Infinity;
    let minTemp = Infinity;
    let dominantCondition = "";

    historicalData.forEach((entry) => {
      const dailyTemps = entry.temperatures;
      if (dailyTemps.length > 0) {
        const dailyAvg =
          dailyTemps.reduce((acc, reading) => acc + reading.temp, 0) /
          dailyTemps.length;
        totalTemp += dailyAvg;

        dailyTemps.forEach((tempReading) => {
          if (tempReading.temp > maxTemp) {
            maxTemp = tempReading.temp;
            dominantCondition = tempReading.condition;
          }
          if (tempReading.temp < minTemp) {
            minTemp = tempReading.temp;
          }
        });
      }
    });

    const avgTemp = totalTemp / historicalData.length;

    return {
      avgTemp: avgTemp.toFixed(2),
      maxTemp: maxTemp.toFixed(2),
      minTemp: minTemp.toFixed(2),
      dominantCondition,
    };
  };

  const dailySummary = calculateDailySummary();

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
        <span className="ml-2 text-lg text-gray-700 dark:text-gray-300"></span>
      </div>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">{cityName}</h1>

          
          {currentWeather && (
            <div className="bg-white shadow-md rounded-lg p-6 mt-6">
              <h2 className="text-xl font-semibold">Current Weather</h2>
              <p className="text-lg">
                Temperature:{" "}
                <span className="font-bold">
                  {currentWeather.temp.toFixed(2)} °
                  {tempUnit === "Kelvin" ? "K" : "C"}
                </span>
              </p>
              <p className="text-lg">
                Condition:{" "}
                <span className="font-bold">{currentWeather.condition}</span>
              </p>
            </div>
          )}

         
          {dailySummary && (
            <div className="bg-white shadow-md rounded-lg p-6 mt-4">
              <h2 className="text-xl font-semibold">Daily Summary</h2>
              <p className="text-lg">
                Average Temperature:{" "}
                <span className="font-bold">
                  {dailySummary.avgTemp} °{tempUnit === "Kelvin" ? "K" : "C"}
                </span>
              </p>
              <p className="text-lg">
                Maximum Temperature:{" "}
                <span className="font-bold">
                  {dailySummary.maxTemp} °{tempUnit === "Kelvin" ? "K" : "C"}
                </span>
              </p>
              <p className="text-lg">
                Minimum Temperature:{" "}
                <span className="font-bold">
                  {dailySummary.minTemp} °{tempUnit === "Kelvin" ? "K" : "C"}
                </span>
              </p>
              <p className="text-lg">
                Dominant Condition:{" "}
                <span className="font-bold">
                  {dailySummary.dominantCondition}
                </span>
              </p>
            </div>
          )}

          
          {chartData && (
            <div className="bg-white shadow-md rounded-lg p-6 mt-4">
              <Line data={chartData} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CityDetail;
