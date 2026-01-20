require("dotenv").config();
const { connectDB, closeDB } = require("./db");

async function seedUsers() {
  try {
    const db = await require("./db").connectDB();

    const newUsers = [
      {
        fullName: "Emma Johnson",
        email: "emma@gmail.com",
        age: 28,
        role: "UI/UX Designer",
        status: "active",
      },
      {
        fullName: "Mike Smith",
        email: "mike@gmail.com",
        age: 32,
        role: "DevOps Engineer",
        status: "active",
      },
    ];

    const result = await db.collection("users").insertMany(newUsers);
    console.log(`Added ${result.insertedIds.length} users`);
    console.log("New User IDs:", result.insertedIds);

    const allUsers = await db.collection("users").find().toArray();
    console.log(` Total users: ${allUsers.length}`);

    await closeDB();
  } catch (err) {
    console.error(" Error:", err);
    process.exit(1);
  }
}

seedUsers();
