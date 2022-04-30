require("dotenv").config();
require("express-async-errors");

const express = require("express");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const port = process.env.PORT || 5000;
const app = express();
app.use(express.json());
//extended false to prevent sending nested objects and filtring out the ?
app.use(express.urlencoded({ extended: false }));

//API routes
app.use("/api/v1/goals", require("./routes/goals"));

//error handling
app.use(errorHandlerMiddleware);
app.listen(port, () => {
  console.log(`server started at ${port}`);
});
