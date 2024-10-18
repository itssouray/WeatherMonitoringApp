const Weather = require('../model/weather');

// Controller to store or append new weather data
const addWeatherData = async (req, res) => {
  const { city, temp, condition } = req.body;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    
    let existingWeather = await Weather.findOne({ city, date: today });

    
    if (existingWeather) {
      existingWeather.readings.push({ temp, condition, timestamp: new Date() });
      await existingWeather.save(); 
      return res.status(200).json(existingWeather);
    }

   
    const newWeatherData = new Weather({
      city,
      date: today,
      readings: [{ temp, condition, timestamp: new Date() }],
    });

    await newWeatherData.save();
    return res.status(201).json(newWeatherData);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const getWeatherData = async (req, res) => {
  const { city } = req.params;

  try {
   
    const weatherData = await Weather.find({ city }).sort({ date: 1 });

    if (!weatherData || weatherData.length === 0) {
      return res.status(404).json({ message: "No weather data found for this city." });
    }
 
    return res.status(200).json(weatherData);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllCityWeatherData = async (req, res) => {
    try {
  
      const allCityData = await WeatherData.find();
  
     
      if (!allCityData.length) {
        return res.status(404).json({ message: "No city weather data found." });
      }
  
     
      return res.status(200).json(allCityData);
    } catch (error) {
      console.error("Error fetching city weather data:", error);
      return res.status(500).json({ message: "Server error while fetching city data." });
    }
  };
  

module.exports = {
  addWeatherData,
  getWeatherData,
  getAllCityWeatherData
};
