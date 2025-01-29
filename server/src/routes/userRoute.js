import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";

import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = Router();
router.use(verifyJWT);

router.route("/getAllUsers").get(verifyJWT, getAllUsers);
router.route("/:userId").get(getUserById).patch(updateUser).delete(deleteUser);

export default router;
