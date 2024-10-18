const mongoose = require('mongoose');


const weatherReadingSchema = new mongoose.Schema({
  temp: { type: Number, required: true },
  condition: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }, 
});


const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  readings: [weatherReadingSchema], 
  date: { type: Date, default: Date.now },
});


const Weather = mongoose.model('Weather', weatherSchema);
module.exports = Weather;
