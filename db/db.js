import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log("Connected to database!");
    });
  } catch (err) {
    console.log("Some error occured while connecting to database:", err);
  }
};

export default dbConnection;
