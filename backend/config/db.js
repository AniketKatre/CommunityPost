const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;

const connectDB = () => {
  mongoose
    .connect(URI)
    .then((data) => {
      console.log("Mongoose Connected");
    })
    .catch((e) => {
      console.log("Not Conncted to DB Some Error: ", e);
    });
};

module.exports = connectDB;
