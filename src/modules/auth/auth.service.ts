import bcrypt from "bcryptjs";
import pool from "../../config/bd.js";
import jwt from 'jsonwebtoken';
import config from "../../config/config.js";

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
}