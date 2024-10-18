const mongoose = require("mongoose");

const connect = async ()=>{
    await mongoose.connect(process.env.DB_URL);
};

module.exports = connect
