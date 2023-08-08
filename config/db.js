const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    const con = await mongoose.connect(db);
    console.log(`connected to ${con.connection.host}`);
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectDB;
