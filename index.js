const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");


// dotenv.config()
//
// mongoose.connect(process.env.MONGO_URL , () => {
//   console.log("Connected to mongodb");
// });

app.use(express.json());
app.use(helmet())
app.use(morgan("common"));

//
//
app.use("/api/" , userRoute);
app.use("/api/auth" , authRoute);





// app.listen(8000 , () => {
//   console.log("Backend server is ready");
// });


module.exports = app
