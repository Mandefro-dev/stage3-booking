const mongoose = require("mongoose");
require("dotenv").config();

function dbConnect() {
  try {
    mongoose.connect(process.env.MONGODB_URL);
    console.log("mongodb connected");
  } catch (error) {
    console.log("error happend when connected to database", error.message);
  }
}
module.exports = dbConnect;
