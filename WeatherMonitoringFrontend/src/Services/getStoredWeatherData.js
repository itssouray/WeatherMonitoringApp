import axios from 'axios';

 const getStoredWeatherData = async (city) => {
    console.log("city : ",city);
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/weather/${city}`);
    console.log("response : ",response);
    return response.data;
  } catch (error) {
    console.error("Error fetching stored weather data:", error);
    throw error;
  }
};


export default getStoredWeatherData;