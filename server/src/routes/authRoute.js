import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import { authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route for registering a new user
router.post("/register", registerUser);

// Route for logging in a user
router.post("/login", loginUser);

// Protected route example (only Super-Admins)
router.post("/admin-route", authorizeRoles([0]), (req, res) => {
  res.send("Only Super-Admin can access this route");
});

export default router;
