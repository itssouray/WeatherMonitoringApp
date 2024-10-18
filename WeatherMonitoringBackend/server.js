require('dotenv').config();
const connect = require("./src/config/connect");
const app = require("./src/app");
require('./src/cronJob'); 

const PORT = process.env.PORT || 8000;

connect()
.then(()=>{
    app.listen(PORT, () => {
        try {
          console.log("Listening to port ", PORT);
        } catch (error) {
          console.error("Something went wrong ", error.message);
        }
    });
})
.catch((err) => {
    console.error("Something went Wrong", err);
});
