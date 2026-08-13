import bcrypt from "bcryptjs";
import pool from "../../config/bd.js";
import jwt from 'jsonwebtoken';
import config from "../../config/config.js";
import type { IUser } from "./auth.interface.js";


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



const loginUserIntoDB = async (data:{email:string,password:string}) => {
    const { email, password } = data;

    //Check the user exists or not
    const isExists = await pool.query(`
        SELECT * FROM users
        WHERE email = $1
        `, [email]);
   
    if (isExists.rows.length===0) {
        throw new Error("Invalid credential");
    }


    //match the password 
    const matchedPass = await bcrypt.compare(password, isExists.rows[0].password);
     if (!matchedPass) {
        throw new Error("Invalid credential");
    };

    //generate token
     const user = isExists.rows[0];
    const payload = {
        id: user?.id,
        name: user?.name,
        role: user?.role
    };
    const token = jwt.sign(payload, config.jwt_secret as string, { expiresIn: '2D' });
    delete user.password

    return {
        token,
        user
    }
};


export const authService = {
    loginUserIntoDB,
    createUserIntoDB
}