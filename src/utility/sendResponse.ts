import type { Response } from "express";

type TResponse<T> = {
    success: boolean,
    message: string,
    statusCode: number,
    error? : any,
    data ? : T
}

const sendResponse = <T>(res: Response, data: TResponse<T>) => {
    res.status(data.statusCode).json({
        success: data.success,
        message: data.message,
        data: data.data,
        error: data.error
    })
};

export default sendResponse