import type { Request, Response } from "express";
import sendResponse from "../../utility/sendResponse.js";
import { authService } from "./auth.service.js";

const LoginUser = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const result = await authService.loginUserIntoDB(data);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Login successful",
            data : result
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

export const authController = {
    LoginUser
}