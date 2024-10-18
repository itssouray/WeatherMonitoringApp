const express = require('express');
const { addWeatherData, getWeatherData,getAllCityWeatherData } = require('../controller/weather.controller'); // Import the controllers

const router = express.Router();


router.post('/', addWeatherData);
router.get("/get-all-data",getAllCityWeatherData);
// GET: Retrieve historical weather data for a specific city
router.get('/:city', getWeatherData);

module.exports = router;
