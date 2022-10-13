const mongoose = require("mongoose");
const app= require('./index');
const dotenv = require('dotenv');
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const helmet = require('helmet');
const morgan = require('morgan');


dotenv.config();




app.use(helmet())
app.use(morgan("common"));



  console.log('Starting up........');


  if (!process.env.MONGO_URL) {
    throw new Error('MONGO_URI must be defined');
  }

  try {
     mongoose.connect(process.env.MONGO_URL, (err) => {
   if(err) console.log(err)
   else console.log("mongdb is connected");
  });

  } catch (err) {
    console.error(err);
  }

 app.use("/api/" , userRoute);
  app.use("/api/auth" , authRoute);


  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
