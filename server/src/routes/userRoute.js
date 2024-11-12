import express from "express";
import { fetchAllUsers } from "../controllers/userController.js";
import {
  authenticateUser,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateUser, authorizeRoles([0]), fetchAllUsers);

export default router;
