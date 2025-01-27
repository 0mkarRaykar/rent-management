// import express from "express";
// import {
//   createAmenity,
//   getAmenity,
//   deleteAmenity,
// } from "../controllers/amenityController.js";
// import {
//   authenticateUser,
//   authorizeRoles,
// } from "../middlewares/authMiddleware.js"; // Import both middlewares

// const router = express.Router();

// // Route to create a new amenity type (Super-Admin only)
// router.post("/", authenticateUser, authorizeRoles([0]), createAmenity); // Ensure authenticateUser is called first

// // Route to get all amenity types
// router.get("/", getAmenity);

// // Route to delete a amenity type (Super-Admin only)
// router.delete("/:id", authenticateUser, authorizeRoles([0]), deleteAmenity); // Ensure authenticateUser is called first

// export default router;
