import express from "express";
import {
  createProperty,
  getProperties,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";
import {
  authenticateUser,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to create a new property (Super-Admin only)
router.post("/", authenticateUser, authorizeRoles([0]), createProperty);

// Route to get all properties (accessible by all authenticated users)
router.get("/", authenticateUser, getProperties);

// Route to update a property (Super-Admin only)
router.put("/:id", authenticateUser, authorizeRoles([0]), updateProperty);

// Route to delete a property (Super-Admin only)
router.delete("/:id", authenticateUser, authorizeRoles([0]), deleteProperty);

export default router;
