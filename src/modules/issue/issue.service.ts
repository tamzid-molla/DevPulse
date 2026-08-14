import pool from "../../config/bd.js";
import type { IIssue } from "./issue.interface.js";


const createIssueIntoDB = async (data: IIssue) => {
    const {title,description,type} = data;
    const allowedType = ["bug", "feature_request"];
    if (!allowedType.includes(type)) {
        throw new Error("Type are not allow , Write a valid type")
    }
    const result = await pool.query(`
            INSERT INTO issues(title,description,type)
            VALUES($1,$2,$3)
            RETURNING *
            `,[title,description,type]);
    
};

export const issueService = {
    createIssueIntoDB,
}