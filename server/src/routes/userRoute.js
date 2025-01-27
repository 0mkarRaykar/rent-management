import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";

import { fetchAllUsers } from "../controllers/userController.js";

const router = Router();

router.route("/").post(verifyJWT, fetchAllUsers);

export default router;
