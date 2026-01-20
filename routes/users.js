const express = require("express");
const { ObjectId } = require("mongodb");
const { getDB } = require("../data/db");

const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const db = getDB();
    const users = await db.collection("users").find().toArray();
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single user by email
router.get("/:email", async (req, res) => {
  try {
    const db = getDB();
    const user = await db.collection("users").findOne({
      email: req.params.email,
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// CREATE user
router.post("/", async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection("users").insertOne(req.body);
    res.status(201).json({ success: true, id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE user by email
router.put("/:email", async (req, res) => {
  try {
    const db = getDB();
    const result = await db
      .collection("users")
      .updateOne({ email: req.params.email }, { $set: req.body });
    if (result.matchedCount === 0)
      return res.status(404).json({ error: "User not found" });
    res.json({ success: true, message: "User updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE user by email
router.delete("/:email", async (req, res) => {
  try {
    const db = getDB();
    const result = await db.collection("users").deleteOne({
      email: req.params.email,
    });
    if (result.deletedCount === 0)
      return res.status(404).json({ error: "User not found" });
    res.json({ success: true, message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
