import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  toggleActiveStatus
} from "../controllers/userController.js";

const router = Router();
router.use(verifyJWT);

router.route("/createUser").post(verifyJWT, createUser);
router.route("/getAllUsers").get(verifyJWT, getAllUsers);
router.route("/:userId").get(getUserById).patch(updateUser).delete(deleteUser);

router.patch("/toggleActiveStatus/:userId", toggleActiveStatus);

export default router;
