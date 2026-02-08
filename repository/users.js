
import User from "../models/users.js";

export async function getAllUsers() {
  return await User.find();
}

export async function getUserByEmail(email) {
  return await User.findOne({ email });
}

