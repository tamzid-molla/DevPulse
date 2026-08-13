import express, { type Application } from "express";

const app: Application = express();
const port = 5001;


app.listen(port, () => {
    console.log(`server running at port ${port}`)
})