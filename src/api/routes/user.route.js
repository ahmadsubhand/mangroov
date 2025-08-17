import e from "express";
import * as controllers from "../controllers/user.controller.js";

const router = e.Router();

router.get('/register', controllers.register);
router.get('/login', controllers.login);
router.get('/logout', controllers.logout);

export default router;