const cron = require('node-cron');
const axios = require('axios');
const Weather = require('../src/model/weather');
const city = require('./city');

// Function to fetch weather data from the external API
const fetchWeatherFromAPI = async (city) => {
  const apiKey = process.env.WEATHER_API_KEY; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    return response.data; 
  } catch (error) {
    console.error(`Error fetching data from the weather API for ${city}:`, error);
    throw error;
  }
};

// Function to save weather data to the backend
const saveWeatherData = async (city) => {
  try {
    const weatherAPIData = await fetchWeatherFromAPI(city);

    const temp = weatherAPIData.main.temp;
    const condition = weatherAPIData.weather[0].description;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

   
    let existingWeather = await Weather.findOne({ city, date: today });

   
    if (existingWeather) {
      existingWeather.readings.push({ temp, condition, timestamp: new Date() });
      await existingWeather.save();
      console.log(`Updated weather data for ${city}`);
    } else {
    
      const newWeatherData = new Weather({
        city,
        date: today,
        readings: [{ temp, condition, timestamp: new Date() }]
      });
      await newWeatherData.save();
      console.log(`Added new weather data for ${city}`);
    }
  } catch (error) {
    console.error(`Error saving weather data for ${city}:`, error);
  }
};

// Cron job: Run every hour
cron.schedule('0 * * * *', () => { 
  city.forEach((city) => {
    saveWeatherData(city); 
  });
  console.log('Weather data updated for all cities');
});
