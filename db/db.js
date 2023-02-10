const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
/**
 * This function connects to the MongoDB database and logs a message to the console if the connection
 * is successful.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/master");
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
