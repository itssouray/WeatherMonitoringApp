import axios from 'axios';

export const getWeatherData = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_BASE_URL_API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data', error);
  }
};
