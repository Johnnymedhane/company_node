import * as userService from "../services/users.js";

// GET /users
export async function getUsersController(req, res) {
  try {
    const users = await userService.fetchAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
}

// GET /users/:email
export async function getUserByEmailController(req, res) {
  try {
    const email = req.params.email;
    const user = await userService.fetchUserByEmail(email);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
}
