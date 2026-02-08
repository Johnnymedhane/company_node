
import * as userRepository from "../repository/users.js";

export async function fetchAllUsers() {
  // You could add business logic here later, e.g., filtering active users
  const users = await userRepository.getAllUsers();
  return users;
}

export async function fetchUserByEmail(email) {
  if (!email) {
    throw new Error("Email is required");
  }
  const user = await userRepository.getUserByEmail(email);
  return user;
}
