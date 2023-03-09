const mongoose = require("mongoose");

const connectDB = () => {
  return mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDB;
