import { Router } from "express";
import { UserController } from "../controllers/user-controller";
import { AsyncHandler } from "../utils/common-utils";
import { AuthController } from "../controllers/auth-controller";

const router = Router();

router.route("/login").post(AsyncHandler(AuthController.Login));

export default router;
