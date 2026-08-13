import type { Request, Response } from "express";
import type { IUser } from "./user.interface.js";

const createUser = async (req: Request, res: Response) => {
    const data: IUser = req.body;
    try {
        
    } catch (error) {
        
    }
};

export const userController = {
    createUser
}