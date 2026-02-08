import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGO_URI, DB_NAME } = process.env;

let db;

export async function connectDB() {
  try {
    await mongoose.connect(`${MONGO_URI}/${DB_NAME}`);
    
    db = mongoose.connection.db;
    console.log("Connected to MongoDB:", db.databaseName);
    return db;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

export function getDB() {
  if (mongoose.connection.readyState !== 1) {
    throw new Error("Database not initialized. Call connectDB() first.");
  }
  return mongoose.connection.db;
}

export async function closeDB() {
  try {
    await mongoose.disconnect();
    console.log("🔌 MongoDB connection closed");
  } catch (err) {
    console.error("Error closing MongoDB connection:", err);
  }
}

