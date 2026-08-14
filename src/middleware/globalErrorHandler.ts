import type { NextFunction, Request, Response } from "express";
import sendResponse from "../utility/sendResponse.js";

export const globalErrorHandler = (error:any ,req: Request, res: Response, next: NextFunction) => {
    sendResponse(res, {
        statusCode: 500,
        success: false,
        message:error.message || "Internal server error"
    })
}