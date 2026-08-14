import type { Request, Response } from "express";
import { issueService } from "./issue.service.js";
import sendResponse from "../../utility/sendResponse.js";


const createIssue = async (req: Request, res: Response) => {
    const loginUser = req.user
    try {
        const result = await issueService.createIssueIntoDB(req.body,loginUser);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Issue created successfully",
            data: result
        })
    } catch (error:any) {
        sendResponse(res, {
            success: false,
            statusCode: 500,
            message: error.message,
            error:error
        })
    }
};


const getAllIssue = async (req: Request, res: Response) => {
    try {
        const result = await issueService.getAllIssueFromDB(req.query);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issues retrieved successfully",
            data: result
        })
    } catch (error:any) {
        sendResponse(res, {
            success: false,
            statusCode: 500,
            message: error.message,
            error:error
        })
    }
};

export const issueController = {
    createIssue,
    getAllIssue
}