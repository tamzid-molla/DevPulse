import pool from "../../config/bd.js";
import type { IUser } from "./user.interface.js";

const createUserIntoDB = async (data: IUser) => {
    const { name, email, password, role } = data;

    const result = await pool.query(`
        INSERT INTO user(name,email,password,role)
        VALUES($1,$2,$3,$4)
        RETURNING *
        `, [name, email, password, role]);
    
    if (result.rows.length === 0) {
        throw new Error("Something went wrong , Try again ")
    };
    
    delete result.rows[0].password
    return result.rows[0];
};


export const userService = {
    createUserIntoDB,
}