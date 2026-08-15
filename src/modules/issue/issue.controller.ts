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

const getSingleIssue = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    try {
        const result = await issueService.getSingleIssueFromDB(id);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue retrieved successfully",
            data: result
        })
    } catch (error: any) {
        sendResponse(res, {
            success: false,
            statusCode: 500,
            message: error.message,
            error: error
        })
    }
};


const updateIssue = async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const loginUser = req.user;
    try {
        const result = await issueService.updateIssueIntoDB(id,loginUser,req.body);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue Update successfully",
            data:result
        })
    } catch (error: any) {
        sendResponse(res, {
            success: false,
            statusCode: 500,
            message: error.message,
            error: error
        })
    }
};


const deleteIssue = async (req: Request<{id:string}>, res: Response) => {
    const { id } = req.params;
     try {
         const result = await issueService.deleteIssueFromDB(id);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Issue deleted successfully",
        })
    } catch (error:any) {
        sendResponse(res, {
            success: false,
            statusCode: 500,
            message: error.message,
            error:error
        })
    }
}

export const issueController = {
    createIssue,
    getAllIssue,
    getSingleIssue,
    deleteIssue,
    updateIssue
}