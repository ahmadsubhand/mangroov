import * as controller from "../controllers/report.controller.js";
import e from "express";
import { authHandler, authMiddleware } from "../middlewares/authHandler.js";
import { checkMultipart, upload } from "../middlewares/upload.js";

const router = e.Router();

router.post(
    '/',
    authMiddleware, authHandler,
    checkMultipart, upload.single('photo'),
    controller.createReport
)

export default router;