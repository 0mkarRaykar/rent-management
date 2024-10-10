import express from "express";
import {
  createPropertyType,
  getPropertyTypes,
  deletePropertyType,
} from "../controllers/propertyTypeController.js";
import {
  authenticateUser,
  authorizeRoles,
} from "../middlewares/authMiddleware.js"; // Import both middlewares

const router = express.Router();

// Route to create a new property type (Super-Admin only)
router.post("/", authenticateUser, authorizeRoles([0]), createPropertyType); // Ensure authenticateUser is called first

// Route to get all property types
router.get("/", getPropertyTypes);

// Route to delete a property type (Super-Admin only)
router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles([0]),
  deletePropertyType
); // Ensure authenticateUser is called first

export default router;
