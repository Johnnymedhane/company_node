const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("company_db");
    const users = db.collection("users");

    // CREATE
    const newUsers = [
      {
        fullName: "Alice Levi",
        email: "alice@gmail.com",
        age: 35,
        role: "Backend Developer",
        status: "inactive",
      },
      {
        fullName: "David Levi",
        email: "david@gmail.com",
        age: 35,
        role: "Backend Developer",
        status: "active",
      },
    ];

    const insertResult = await users.insertMany(newUsers);
    console.log("New User IDs:", insertResult.insertedIds);

    // UPDATE (example)
    const updateResult = await users.updateOne(
      { email: "alice@gmail.com" },
      { $set: { status: "active" } },
    );
    console.log("Updated Count:", updateResult.modifiedCount);

    // DELETE (example)
    const deleteResult = await users.deleteOne({ email: "david@gmail.com" });
    console.log("Deleted Count:", deleteResult.deletedCount);
    // READ
    const allUsers = await users.find().toArray();
    console.log("Users:", allUsers);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();
