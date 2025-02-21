import { Router } from "express";
import { AsyncHandler } from "../utils/common-utils";
import { MessageController } from "../controllers/message-controller";

const router = Router();
router.route("/messages").post(AsyncHandler(MessageController.sendMessage));

export default router;
