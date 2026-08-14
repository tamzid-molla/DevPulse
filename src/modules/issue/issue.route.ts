import { Router } from "express";
import { issueController } from "./issue.controller.js";


const router = Router();
router.post("/", issueController.createIssue);


export const issueRouter = router;