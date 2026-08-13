import { Router } from "express";
import { authController } from "./auth.controller.js";
const router = Router();

router.post("/signup", authController.createUser);
router.post("/login",authController.LoginUser)

export const authRouter = router;