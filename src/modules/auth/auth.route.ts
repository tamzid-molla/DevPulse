import { Router } from "express";
import { authController } from "./auth.controller.js";
const router = Router();

router.post("/login",authController.LoginUser)

export const authRouter = router;