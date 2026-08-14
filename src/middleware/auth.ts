import type { NextFunction, Request, Response } from "express";
import type { ROLES } from "../types/index.js"
import sendResponse from "../utility/sendResponse.js";
import jwt, { type JwtPayload } from 'jsonwebtoken'
import config from "../config/config.js";
import pool from "../config/bd.js";

export const authMiddleware = (...roles: ROLES[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const token = req.headers?.authorization;
        if (!token) {
            return sendResponse(res, {
                statusCode: 401,
                success: false,
                message:"Unauthorize access!!"
            })
        };

        const decoded = jwt.verify(token as string, config.jwt_secret as string) as JwtPayload;
        const userData = await pool.query(`
            SELECT * FROM users 
            WHERE id = $1
            `, [decoded?.id]);
        const user = userData.rows[0]

        if (roles.length === 0 || !roles.includes(user?.role)) {
            return sendResponse(res, {
                statusCode: 403,
                success: false,
                message:"Forbidden access!!"
            })
        }
            req.user = decoded;
            next()
        } catch (error) {
            next(error)
        }
        
    }
};