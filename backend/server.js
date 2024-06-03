const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5001;

const app = express();

//cnnect DB
connectDB();

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
