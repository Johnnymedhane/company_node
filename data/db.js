require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const dbName = process.env.DB_NAME || "company_db";

let client;
let db;

async function connectDB() {
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log(" Connected to MongoDB");
    return db;
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    throw err;
  }
}

function getDB() {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB() first.");
  }
  return db;
}

async function closeDB() {
  if (client) {
    await client.close();
    console.log("🔌 MongoDB connection closed");
  }
}

module.exports = {
  connectDB,
  getDB,
  closeDB,
};
