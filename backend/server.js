require("dotenv").config();
require("express-async-errors");

const express = require("express");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const notFound = require("./middlewares/not_found");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
//extended false to prevent sending nested objects and filtring out the ?
app.use(express.urlencoded({ extended: false }));

//API routes
app.use("/api/v1/goals", require("./routes/goals"));
app.use("/api/v1/users", require("./routes/user"));

//error handling
app.use(notFound);
app.use(errorHandlerMiddleware);

const fireServer = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected");
    app.listen(port, () => {
      console.log(`server started at ${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

fireServer();
