import express from "express";
import {
  getUsersController,
  getUserByEmailController,
} from "../controllers/users.js";

const router = express.Router();

// GET /users
router.get("/", getUsersController);

// GET /users/:email
router.get("/:email", getUserByEmailController);

export default router;
