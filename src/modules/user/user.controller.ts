import type { Request, Response } from "express";
import type { IUser } from "./user.interface.js";
import { userService } from "./user.service.js";
import sendResponse from "../../utility/sendResponse.js";

const createUser = async (req: Request, res: Response) => {
    const data: IUser = req.body;
    try {
        const result = await userService.createUserIntoDB(data);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "User created successful",
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

export const userController = {
    createUser
}