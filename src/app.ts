import express, { type Application, type Request, type Response } from "express";
import pool from "./config/bd.js";
import { authRouter } from "./modules/auth/auth.route.js";
export const app: Application = express();

app.use(express.json());


//database connection 
const connectDB = async () => {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS users
        (
        id SERIAL PRIMARY KEY,
        name varchar(30) NOT NULL,
        email varchar(30) UNIQUE NOT NULL,
        password varchar(255) NOT NULL,
        role varchar(15) DEFAULT 'contributor' 
        CHECK (role IN('contributor', 'maintainer')),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )
        `);
    
    await pool.query(`
        CREATE TABLE IF NOT EXISTS issues
        (
        id SERIAL PRIMARY KEY,
        title varchar(150) NOT NULL,
        description TEXT NOT NULL CHECK(LENGTH(description) >= 20),
        type varchar(30) NOT NULL CHECK(type IN('feature_request','bug')),
        status varchar(20) DEFAULT 'open' 
        CHECK (status IN('open', 'in_progress','resolved')),
        reporter_id INT NOT NULL ,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )
        `)
};

connectDB()

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        message: "Server running good"
    })
});

app.use("/api/auth",authRouter);

