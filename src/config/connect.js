import mongoose from "mongoose";

export const connectDB = async (uri) => {
  console.log("uri", uri);

  try {
    await mongoose.connect(uri);
    console.log("DB CONNECTED---");
  } catch (error) {
    console.log("database connection error", error);
  }
};
