import * as controller from "../controllers/report.controller.js";
import e from "express";
import { authHandler, authMiddleware, organizationHandler } from "../middlewares/authHandler.js";
import { checkMultipart, upload } from "../middlewares/upload.js";

const router = e.Router();

router.post(
    '/',
    authMiddleware, authHandler,
    checkMultipart, upload.single('photo'),
    controller.createReport
)
router.get(
    '/',
    authMiddleware, authHandler, organizationHandler,
    controller.getAllReports
)
router.put(
  '/:reportId',
  authMiddleware,
  authHandler,
  organizationHandler,
  controller.updateReportStatus
);

export default router;