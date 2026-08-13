import bcrypt from "bcryptjs";
import pool from "../../config/bd.js";
import type { IUser } from "./user.interface.js";

const createUserIntoDB = async (data: IUser) => {
    const { name, email, password, role } = data;

    //check role 
    const allowedRoles = ["maintainer", "contributor"];
    if (role && !allowedRoles.includes(role)) {
    throw new Error("Invalid role");
    };

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(`
        INSERT INTO users(name,email,password,role)
        VALUES($1,$2,$3,COALESCE($4,'contributor'))
        RETURNING *
        `, [name, email, hashedPassword, role]);
    
    if (result.rows.length === 0) {
        throw new Error("Something went wrong , Try again ")
    };

    delete result.rows[0].password
    return result.rows[0];
};


export const userService = {
    createUserIntoDB,
}