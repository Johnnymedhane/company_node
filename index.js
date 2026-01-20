require("dotenv").config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db(process.env.DB_NAME || "company_db");
    const users = db.collection("users");

    const allUsers = await users.find().toArray();
    console.log(" Users:", allUsers);
  } catch (err) {
    console.error(" Error:", err);
  } finally {
    await client.close();
  }
}

run();
