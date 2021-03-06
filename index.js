const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || process.env.API_PORT;
app.use(cors());
app.options("*", cors());
app.use(express.urlencoded({ extended: true }));

// Routes
const userRoutes = require("./routes/user");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connection Successful :)");
  })
  .catch((err) => {
    console.log("Database Connection Failed :(");
    console.log(err);
  });

app.use(express.json());

app.use(userRoutes);

app.listen(port, () => {
  console.log(`Server runnig at port ${port}`);
});
