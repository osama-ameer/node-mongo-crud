const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.mongoURI);
    console.log("MongoDB connected!");
  } catch (error) {
    console.log("Error ", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
