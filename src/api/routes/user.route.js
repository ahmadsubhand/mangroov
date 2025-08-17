import e from "express";
import * as controllers from "../controllers/user.controller.js";
import { authHandler, authMiddleware, organizationHandler } from "../middlewares/authHandler.js";

const router = e.Router();

router.post('/register', controllers.register);
router.post('/login', controllers.login);
router.post('/logout', controllers.logout);
router.get('/me', authMiddleware, authHandler, controllers.isAuthenticated);
router.get('/is-organization', authMiddleware, authHandler, organizationHandler, controllers.isOrganization)

export default router;