import 'dotenv/config';
// import { connectDB, closeDB } from './db.js';
import { connectDB, closeDB } from './db.js';
import User from '../models/users.js';
async function seedUsers() {
  try {
    const db = await connectDB();

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

    const result = await User.insertMany(newUsers);
    console.log(`Added ${result.length} users`);
    console.log("New User IDs:", result.map(user => user._id));

    const allUsers = await User.find();
    console.log(` Total users: ${allUsers.length}`);

    await closeDB();
  } catch (err) {
    console.error(" Error:", err);
    process.exit(1);
  }
}

seedUsers();
