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
  const [dailySummary, setDailySummary] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { tempUnit, toggleTemperatureUnit } = useTemperatureUnit();

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

          const historical = latestData.readings.map((reading) => ({
            date: new Date(reading.timestamp),
            temp: convertTemperature(reading.temp, tempUnit), 
          }));

          const aggregates = calculateDailyAggregates(latestData.readings, tempUnit);
          setDailySummary(aggregates);
          setHistoricalData(historical);
        }
      } catch (error) {
        console.error("Error fetching weather data from backend:", error);
        setError("Failed to fetch weather data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherDataFromBackend();
  }, [cityName, tempUnit]); 

  const calculateDailyAggregates = (readings, unit) => {
    if (!readings.length)
      return { avgTemp: 0, maxTemp: 0, minTemp: 0, dominantCondition: "N/A" };

    const temperatures = readings.map((entry) => convertTemperature(entry.temp, unit));
    const conditions = readings.map((entry) => entry.condition);

    const avgTemp = (
      temperatures.reduce((acc, curr) => acc + curr, 0) / temperatures.length
    ).toFixed(2);
    const maxTemp = Math.max(...temperatures);
    const minTemp = Math.min(...temperatures);

    const dominantCondition = conditions
      .sort(
        (a, b) =>
          conditions.filter((v) => v === a).length -
          conditions.filter((v) => v === b).length
      )
      .pop();

    return { avgTemp, maxTemp, minTemp, dominantCondition };
  };

  const chartData = {
    labels: historicalData.map((_, index) => `Day ${index + 1}`),
    datasets: [
      {
        label: `Average Temperature (${tempUnit === 'Kelvin' ? '°K' : '°C'})`,
        data: historicalData.map((data) => data.temp),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">{cityName}</h1>


      {loading && <p className="text-center">Loading weather data...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {currentWeather && (
        <div className="bg-white shadow-md rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold">Current Weather</h2>
          <p className="text-lg">
            Temperature:{" "}
            <span className="font-bold">{currentWeather.temp.toFixed(2)} °{tempUnit === 'Kelvin' ? 'K' : 'C'}</span>
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
            <span className="font-bold">{dailySummary.avgTemp} °{tempUnit === 'Kelvin' ? 'K' : 'C'}</span>
          </p>
          <p className="text-lg">
            Maximum Temperature:{" "}
            <span className="font-bold">{dailySummary.maxTemp} °{tempUnit === 'Kelvin' ? 'K' : 'C'}</span>
          </p>
          <p className="text-lg">
            Minimum Temperature:{" "}
            <span className="font-bold">{dailySummary.minTemp} °{tempUnit === 'Kelvin' ? 'K' : 'C'}</span>
          </p>
          <p className="text-lg">
            Dominant Condition:{" "}
            <span className="font-bold">{dailySummary.dominantCondition}</span>
          </p>
        </div>
      )}

      {historicalData.length > 0 && (
        <div className="bg-white shadow-md rounded-lg p-6 mt-4">
          <h2 className="text-xl font-semibold">Historical Temperature Data</h2>
          <div style={{ position: "relative", height: "300px", width: "100%" }}>
            <Line
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    type: "category",
                  },
                  y: {
                    title: {
                      display: true,
                      text: `Temperature (°${tempUnit === 'Kelvin' ? 'K' : 'C'})`,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CityDetail;
