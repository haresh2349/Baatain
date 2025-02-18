import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { AsyncHandler } from "../utils/common-utils";

const router = Router();

// router.post("/signup", AsyncHandler(UserController.register));
router.route("/").get(AsyncHandler(UserController.fetchAllUsers));

export default router;
