import { Router } from "express";
import { issueController } from "./issue.controller.js";
import { authMiddleware } from "../../middleware/auth.js";
import { USER_ROLE } from "../../types/index.js";



const router = Router();
router.post("/", authMiddleware(USER_ROLE.contributor, USER_ROLE.maintainer), issueController.createIssue);
router.get("/",issueController.getAllIssue)


export const issueRouter = router;