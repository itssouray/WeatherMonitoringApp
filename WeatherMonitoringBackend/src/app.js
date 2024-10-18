const cors = require('cors');
const express = require("express");
const router = require("./router/weather.router");

const app = express();
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
}));
app.use(express.json());

app.use("/api/weather",router);


module.exports = app;
